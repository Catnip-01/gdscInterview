import React, { useState, useEffect } from "react";
import axios from "axios";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState("");
  const [retrievedData, setRetrievedData] = useState("");

  const retrieveData = async () => {
    console.log("data retrieved");
    const res = await axios.get("http://localhost:5000/getCandidates");
    // console.log("res : " + JSON.stringify(res.data));s
    setRetrievedData(res.data);
  };

  const uploadData = async () => {
    console.log("entered this function");
    try {
      const res = await axios.post("http://localhost:5000/insertCandidate", {
        name: name,
        email: email,
        score: parseInt(score),
      });
      console.log(JSON.stringify(res));
    } catch (err) {
      console.log("error while uploading form frontend : " + err);
    }
  };

  useEffect(() => {
    if (retrievedData) {
      console.log("retrieved data : " + JSON.stringify(retrievedData[0]));
      //   retrievedData.map((value) => {
      //     console.log("value : " + JSON.stringify(value));
      //   });
    }
  }, [retrievedData]);

  return (
    <div className="bg-black text-white w-screen h-full min-h-screen flex flex-col items-center">
      <div className="mt-12 flex flex-col p-10 items-center">
        <h1 className="pb-3 text-xl">Insert New Candidate : </h1>
        <input
          className="m-1 p-5 rounded border border-white bg-black"
          onChange={(e) => setName(e.target.value)}
          placeholder="enter name"
        ></input>
        <input
          className="m-1 p-5 rounded border border-white bg-black"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter email"
        ></input>
        <input
          className="m-1 p-5 rounded border border-white bg-black"
          onChange={(e) => setScore(e.target.value)}
          placeholder="enter score"
        ></input>
        <button
          className="m-1 p-2 w-fit rounded hover:rounded-full border border-white bg-black"
          onClick={uploadData}
        >
          click to upload
        </button>
      </div>

      <h1 className="text-xl mb-5">Get Ranking : </h1>
      <button
        className="m-1 p-2 w-fit rounded hover:rounded-full border border-white bg-black"
        onClick={retrieveData}
      >
        retrieve data
      </button>
      {/* {retrievedData && <div>{JSON.stringify(retrievedData)}</div>} */}
      {retrievedData && (
        <div className="w-10/12">
          <div className="flex items-center justify-around border border-white flex-row">
            <p className="px-10">score</p>
            <p className="px-10">name</p>
            <p className="px-10">email</p>
          </div>
          {retrievedData.map((value) => {
            return (
              <div className="flex items-center justify-around border border-white flex-row">
                <p className="px-10">{value.score}</p>
                <p className="px-10">{value.name}</p>
                <p className="px-10">{value.email}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Form;
