import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityGameComponent(props) {
  const navigate = useNavigate();
  const { GameFiles, width, height } = props;

  function getLoaderJs(data) {
    for (let index = 0; index < data?.length; index++) {
      if (data[index]?.link?.includes(".loader.js")) {
        return process.env.REACT_APP_SOCKET_SERVER + "/" + data[index]?.link;
      }
    }
  }

  function getFrameworkJs(data) {
    for (let index = 0; index < data?.length; index++) {
      if (data[index]?.link?.includes(".framework.js")) {
        return process.env.REACT_APP_SOCKET_SERVER + "/" + data[index]?.link;
      }
    }
  }

  function getDataJs(data) {
    for (let index = 0; index < data?.length; index++) {
      if (data[index]?.link?.includes(".data")) {
        return process.env.REACT_APP_SOCKET_SERVER + "/" + data[index]?.link;
      }
    }
  }

  function getWasmJs(data) {
    for (let index = 0; index < data?.length; index++) {
      if (data[index]?.link?.includes(".wasm")) {
        return process.env.REACT_APP_SOCKET_SERVER + "/" + data[index]?.link;
      }
    }
  }

  const { unityProvider, unload, UNSAFE__unityInstance } = useUnityContext({
    loaderUrl: getLoaderJs(GameFiles),
    dataUrl: getDataJs(GameFiles),
    frameworkUrl: getFrameworkJs(GameFiles),
    codeUrl: getWasmJs(GameFiles),
  });

  window.myGameInstance = UNSAFE__unityInstance;

  async function handleClickBack() {
    await unload();
  }

  const [finishStatus, setfinishStatus] = useState(false);

  const onBackButtonEvent = async (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to go back ?")) {
        setfinishStatus(true);
        await handleClickBack();
        setTimeout(() => {
          navigate({
            pathname: "/",
          });
        }, 5000);
      } else {
        window.history.pushState(null, null, window.location.href);
        setfinishStatus(false);
        navigate({
          pathname: "/",
        });
      }
    }
  };

  useEffect(() => {
    if (finishStatus) window.location.reload();
  }, [finishStatus]);

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  });

  return (
    <Unity
      style={{
        width: width ? width : "100%",
        height: height ? height : "100vhd",
      }}
      unityProvider={unityProvider}
    />
  );
}
