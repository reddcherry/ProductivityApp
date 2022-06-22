const useSubmit = (submissionType) => {


  const submitter = async (content="", date, method='') => {
    try {
      const resp = await fetch(
        `https://productivity-33ac4-default-rtdb.firebaseio.com/${submissionType}/${date}.json`,
        method?{
          method: method,
          body: JSON.stringify({
            date: date,
            content: content,
          }),
          headers: {
            "content-type": "application/json",
          },
        }:{method:"GET"}
      );
        const data = await resp.json();
        console.log(data);
        if(!resp.ok) throw new Error("Something Went Wrong");
        return data;
    } catch (e) {
     alert(e.message)
    }
    
  };

  return [submitter]
};

export default useSubmit;