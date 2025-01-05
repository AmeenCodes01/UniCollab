

export const  copyToClipboard = async (emailCopy: string) => {
   
    navigator.clipboard.writeText(emailCopy);
    
  };