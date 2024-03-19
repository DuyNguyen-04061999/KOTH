export const getCurrentNextLevel = (registerList, tierList) => {
  const sortedTierList = tierList?.sort((a, b) => a.level - b.level);
  for (let index = 0; index < sortedTierList.length; index++) {
    if (sortedTierList[index]?.status === "unable_claim") {
      return {
        nextSignUpCondition: sortedTierList[index]?.signUpCondition,
        nextSubcribersCondition: sortedTierList[index]?.subcribersCondition,
        nextTierName: sortedTierList[index]?.tierName,
        tierName: index !== 0 ? sortedTierList[index - 1]?.tierName : undefined,
      };
    }
  }
  return {
    nextTierName: undefined,
    tierName: sortedTierList[sortedTierList.length - 1]?.tierName,
    nextSignUpCondition: undefined,
    nextSubcribersCondition: undefined,
  };
};
