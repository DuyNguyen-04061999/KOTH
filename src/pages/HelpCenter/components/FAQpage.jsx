import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: useTheme().spacing(3),
  },
  dropdown: {
    width: "200px",
    marginBottom: useTheme().spacing(2),
  },
}));

const HelpCenterPage = () => {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const Faqtitle = [
    { title: "Global", icon: "1" },
    { title: "Account", icon: "2" },
    { title: "Wallet", icon: "3" },
    { title: "Game", icon: "4" },
  ];
  const dataGlobal = [
    {
      question: "Can I register on your site?",
      answer: `You must be at least 18 years old or the age of majority in your jurisdiction. You must be eligible to play online games in accordance with applicable laws. For more information, please refer to our terms and conditions.
      Games can be addictive, so players are advised to exercise self-control.`,
    },
    {
      question: "Does Your Website have a mobile app?",
      answer: `Currently, we have no mobile app.`,
    },
  ];

  const dataAccount = [
    {
      question: "Can I sign up without agreeing to the terms and conditions?",
      answer:
        "No, you must agree to the terms and conditions of the website in order to become a member of ours.",
    },
    {
      question: "What should I do if I forgot my password?",
      answer:
        "If you have forgotten your password, you can reset it within 15 seconds by using the Forgot Password link. After you apply to reset your password, please follow the instructions in the email we send you to reset your password.",
    },
    {
      question:
        "If I don't remember the email used for registration, is it possible to recover the account?",
      answer:
        "In that case, you should contact us. For the security of your account, you will need to provide accurate answers to some security questions, and then we will proceed with the account recovery for you.",
    },
    {
      question: "Can I change my username or registered email address?",
      answer:
        "We`re sorry, but we can`t update this information. If you insist on changing your username and/or registered email address, we suggest that you close your current account and register a new one.",
    },
    {
      question: "How can I become a VIP?",
      answer: "[Comming Soon]",
    },
  ];

  const dataWallet = [
    {
      question: "My Wallet",
      answer:
        "My wallet is part of the player account. You can view the balance, deposit and withdraw funds, as well as access transaction history.",
    },
    {
      question: "Is my wallet created for security purposes?",
      answer: "Có. Ví của bạn được .....(Cái này nhờ dev giải thích)",
    },
    {
      question: "What is DogeGold?",
      answer:
        "DogeGold is a special currency issued by KingOfTheHill. 100 DogeGold is equivalent to 1 USD and can be used to play games on the KingOfTheHill platform.",
    },
    {
      question: "Is DogeGold a cryptocurrency?",
      answer:
        "No, DogeGold is just a currency used on the KingOfTheHill website.",
    },
    {
      question: "How to deposit?",
      answer:
        "Step 1: Find the Wallet page, click on the Deposit page, copy the wallet address, or scan the QR code to transfer funds. Step 2: After sending the funds, click the Check Deposit button for the system to verify the transaction and add DogeGold to the wallet.",
    },
    {
      question: "Số tiền gửi tối thiểu",
      answer: "[Comming Soon]",
    },
    {
      question: "How to withdraw money?",
      answer: `Step 1: Find the Wallet page and click on the Withdrawal page.
      Step 2: Enter the wallet address you wish to withdraw to and the amount of cryptocurrency (taking note of the applicable fees).`,
    },
    {
      question: "Số tiền rút tối thiểu",
      answer: "[Comming Soon]",
    },
    {
      question: "How long does it take to deposit and withdraw?",
      answer: `
      About Deposit:
      - Each transaction on the blockchain requires several cycles to confirm a successful transfer entry. 
      - Typically, each transaction requires 5-10 minutes before it is validated on the blockchain.
      About Withdraw:
      - The admin will review and issue the order, so the processing time will be between 24 to 48 hours.      
      `,
    },
    {
      question: "Where do transaction confirmations come from?",
      answer:
        "All validation information comes from the wallet operator, blockchain and miners.",
    },
    {
      question: "How long does it take to confirm the transaction?",
      answer:
        "It depends on the blockchain and your transfer fee. It can take as little as 10 minutes or as long as a few hours.",
    },
    {
      question: "Is our game fair?",
      answer:
        "This website focuses on PvP and challenges, all of which depend on your skills and luck. We assure you that we do not manipulate any games on the website.",
    },
    {
      question: "Why do you require a withdrawal fee?",
      answer:
        "When we create a transaction, the information is broadcasted on the network, and miners collect and bundle the transactions into blocks. Only after a block is successfully created, the transaction is confirmed. While miners receive a fixed monetary reward for creating a block, according to the protocol, the reward is gradually halved over time, becoming increasingly scarce, and eventually miners may not have a profit incentive. Therefore, transaction fees are necessary to sustain mining operations.",
    },
    {
      question: "The role of the withdrawal fee",
      answer: `
      Encourage miners.
      - Prevent excessive small-scale network attacks. Due to being a P2P network, the transaction processing capacity is limited. If everyone frequently performs small transactions, the network will become congested, leading to delays or even stagnation. Therefore, it is advisable to set a threshold where the number of transactions will naturally decrease when there is a small transaction.
      `,
    },
    {
      question: "What is the withdrawal fee?",
      answer:
        "As transactions involve a two-way fee, it means that selling a type of digital currency requires a minimum withdrawal fee of 0.1% for the system.",
    },
  ];

  const dataGames = [
    {
      question: "What games are available on Your Website?",
      answer: `
      We offers a selection of PVP, Free To Play games and you can see our collection of game in the All Game Section.
      `,
    },
    {
      question: "Do I Need Internet To Play The Game?",
      answer: "Yes. Our games are Web Based so they run online",
    },
    {
      question: "What do I need to play?",
      answer:
        "Aside from internet, you only need a browser ... and that's it! With this you can play our game on PC, Mobile,.... anywhere and anytime you like.",
    },
    {
      question: "Do I have to download or install something to play?",
      answer: "Never! You only need a web browser to play our games.",
    },
    {
      question: "Are your games completely free?",
      answer:
        "They are free but Some of our games will require you to bet money on and some will let you play whenever you like.",
    },
    {
      question: "Can I play my game with people on other platform?",
      answer: "Yes, you can play the game with people on other platform",
    },
    {
      question: "I launched a new room but nobody is joining?",
      answer:
        "For the most popular games, you can find players at any time of day. For other games, we advise you to come back at peak hour. But you don't need to worry about that because you offer you the option to play with bot. Or you can invite your online come into the room and play with you.",
    },
    {
      question: "I joined a game. When does the game start?",
      answer: `
      Each room has an administrator, who is the room creator. It is the responsibility of the room administrator to start the game when he or she is satisfied with the number of players who have joined the table.
      If you are the table administrator and can't launch the game, most of the time it's because there are not yet enough players who have joined the table.
      There is a quick way to begin the game right away that is let bot join the game.      
      
      `,
    },
    {
      question: "How many people a game need to start?",
      answer: "Depend on the game you play it may change from 2 to 4 player",
    },
    {
      question: "Can I have more than one account?",
      answer: "Our users are limited to a single account only.",
    },
    {
      question:
        "What is absolutely forbidden when playing the game in Your Website?",
      answer: "[Comming Soon]",
    },
    {
      question: "What happen if my opponent disconect?",
      answer:
        "In the event that any user disconnects from a match while losing or in a tie, your match will most likely result in a dispute. If there is no reasonable excuse with evidence for leaving the match, the match will be forfeited for the user that disconnected. Players that are found to disconnect from matches repeatedly will have their account reviews and potentially banned.",
    },

    {
      question:
        "What Is the maximum amount of money i can play in single matches?",
      answer: "It depend on the game you are playing.",
    },
    {
      question: `When I select "Play Now", nothing happends.`,
      answer:
        "It may well be a pop-up blocker in the browser. This should not happen as the new window is from the same site, but there is a browser that does this. Also check that the new window is not under the main browser window.",
    },
    {
      question: "Game Not Loading?",
      answer:
        "Some of our game require WebGL to be enabled. Go to https://get.webgl.org/, if you see a spinning cube it means you do. If you don’t, you have to install and enable WebGL.",
    },
    {
      question: "Game has no sound?",
      answer:
        "If your using Chrome version greater than 64, they disable autoplay of audio when you play games.",
    },
    {
      question: "Why my control not working?",
      answer:
        "Some game requires you to select it before you can use the keyboard keys. So click inside of the game canvas (screen) to select it so your keyboard commands are linked to the game itself and not the web page your currently viewing.",
    },
  ];

  const [tabFaq, setTabFaq] = useState("");

  const renderTitle = Faqtitle.map((e, index) => {
    return (
      <Box key={index}>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", padding: "15px" }}
          onClick={() => {
            if (index === 0) {
              setTabFaq("Global");
            } else if (index === 1) {
              setTabFaq("Account");
            } else if (index === 2) {
              setTabFaq("Wallet");
            } else if (index === 3) {
              setTabFaq("Games");
            }
          }}
        >
          {width < 576 ? `${e.icon}` : `${e.title}`}
        </Typography>
      </Box>
    );
  });

  const renderFaq = () => {
    if (tabFaq === "Global") {
      const data1 = dataGlobal.map((e, index) => {
        return (
          <div key={index} style={{ padding: "15px" }}>
            <Typography variant="h6">{e.question}</Typography>
            <Typography variant="subtitle1" sx={{ color: "#605daf" }}>
              - {e.answer}
            </Typography>
          </div>
        );
      });
      return data1;
    } else if (tabFaq === "Account") {
      const data2 = dataAccount.map((e, index) => {
        return (
          <div key={index} style={{ padding: "15px" }}>
            <Typography variant="h6">{e.question}</Typography>
            <Typography variant="subtitle1" sx={{ color: "#605daf" }}>
              - {e.answer}
            </Typography>
          </div>
        );
      });
      return data2;
    } else if (tabFaq === "Wallet") {
      const data3 = dataWallet.map((e, index) => {
        return (
          <div key={index} style={{ padding: "15px" }}>
            <Typography variant="h6">{e.question}</Typography>
            <Typography variant="subtitle1" sx={{ color: "#605daf" }}>
              {e.answer}
            </Typography>
          </div>
        );
      });
      return data3;
    } else if (tabFaq === "Games") {
      const data4 = dataGames.map((e, index) => {
        return (
          <div key={index} style={{ padding: "15px" }}>
            <Typography variant="h6">{e.question}</Typography>
            <Typography variant="subtitle1" sx={{ color: "#605daf" }}>
              - {e.answer}
            </Typography>
          </div>
        );
      });
      return data4;
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
        FAQ
      </Typography>
      <Grid container sx={{}}>
        <Grid
          item
          xs={2}
          md={2}
          sx={{
            color: "#9485b7",
            backgroundColor: "#2a2535",
            borderRight: "5px solid #211d28",
          }}
        >
          {renderTitle}
        </Grid>
        <Grid
          item
          xs={10}
          md={10}
          sx={{
            color: "white",
            backgroundColor: "#2a2535",
            marginBottom: "50px",
          }}
        >
          {renderFaq()}
        </Grid>
      </Grid>
    </div>
  );
};

export default HelpCenterPage;
