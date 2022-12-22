const copyToClipBoard = async (textTopCopy) => {
  const textCopied = await textTopCopy;
  return navigator.clipboard.writeText(textCopied);
};

export default copyToClipBoard;
