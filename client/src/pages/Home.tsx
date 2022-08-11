// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [jwtToken, setJwtToken] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageInputNeeded, setImageInputNeeded] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [baseImage, setBaseImage] = useState("");
  const [userData, setUserData] = useState({});
  const [effect, setEffect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwtToken"));
    setJwtToken(jwt);
    axios
      .get(`http://localhost:5000/user/getDetails/${jwt?.payload?.email}`)
      .then((res) => {
        console.log(res);
        setUserData(res.data[0]);
        if (res.data[0].image !== null) {
          setImageUploaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [effect]);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  const getImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = () => {
    if (fileSelected) {
      axios
        .put("http://localhost:5000/user/uploadImage", {
          email: userData.email,
          image: baseImage,
        })
        .then((res) => {
          console.log(res);
          setImageUploaded(true);
          setEffect(!effect);
          setImageInputNeeded(false);
          setFileSelected(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Choose a file first");
    }
  };

  const deleteImage = () => {
    axios
      .put("http://localhost:5000/user/uploadImage", {
        email: userData.email,
        image: null,
      })
      .then((res) => {
        console.log(res);
        setImageUploaded(false);
        setImageInputNeeded(false);
        setEffect(!effect);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container my-5 text-center">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>This is home page</h3>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="my-4">
        <span>
          JWT Token:
          <br />
          <textarea rows={3} cols={90} value={jwtToken?.token} readOnly />
        </span>
        <br />
        <span>
          <b>Username:</b> {jwtToken?.payload?.name}
        </span>
        <br />
        <span>
          <b>Email:</b> {jwtToken?.payload?.email}
        </span>
      </div>

      <div className="my-4">
        {imageUploaded ? (
          <div>
            <img alt="image not found" width="250px" src={userData.image} />
            <br />
            <br />
            <button
              onClick={() => {
                setImageInputNeeded(true);
              }}
            >
              Change Photo
            </button>
            <button onClick={deleteImage}>Remove Photo</button>
          </div>
        ) : (
          <button onClick={uploadImage}>Upload profile photo</button>
        )}

        <br />

        {imageInputNeeded && (
          <button onClick={uploadImage}>Update profile photo</button>
        )}

        <br />
        <br />

        {(!imageUploaded || imageInputNeeded) && (
          <input
            type="file"
            name="myImage"
            accept="image/*"
            about="amaaz"
            onChange={(e) => {
              setFileSelected(true);
              getImage(e);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
