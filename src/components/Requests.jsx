import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests || requests.length === 0) {
    return <h1>No connection found</h1>;
  }

  return (
    <div className=" text-center my-10 ">
      <h1 className="text-3xl text-white ">Connection Requests</h1>
      {requests.map((connection) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          connection.fromUserId;
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4  bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                className="w-20 h-20 rounded-full"
                alt="photo"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " , " + gender}</p>}
              {about && <p>{about}</p>}
            </div>
            <div>
              <button className="btn btn-primary mx-4">Accept</button>
              <button className="btn btn-secondary">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
