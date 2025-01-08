import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.data?.firstName || "");
  const [lastName, setLastName] = useState(user?.data?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.data?.photoUrl || "");
  const [gender, setGender] = useState(user?.data?.gender || "");
  const [age, setAge] = useState(user?.data?.age || "");
  const [about, setAbout] = useState(user?.data?.about || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleProfile = async () => {
    // Clear previous error and success messages
    setError("");
    setSuccess(false);

    // Basic validation
    if (!firstName || !lastName || !age || !gender || !about) {
      setError("All fields except 'Photo URL' are required.");
      return;
    }

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, gender, age, about },
        { withCredentials: true }
      );

      // Update Redux store
      dispatch(addUser(res.data));

      // Show success message
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data || "An error occurred while updating the profile."
      );
    }
  };
  // useEffect(() => {
  //   // Ensure the form is populated with the latest user data
  //   if (user) {
  //     setFirstName(user.firstName);
  //     setLastName(user.lastName);
  //     setPhotoUrl(user.photoUrl);
  //   }
  // }, [user]);

  return (
    <>
      <div className="flex my-10 justify-center">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    value={about}
                    placeholder="Type here"
                    className="textarea textarea-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={handleProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {user && (
          <UserCard
            user={{ firstName, lastName, photoUrl, gender, age, about }}
          />
        )}
      </div>

      {success && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Changed successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
