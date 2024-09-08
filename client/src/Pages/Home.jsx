import { Link } from "react-router-dom";
import ToastMsg from "../Utility/ToastMsg";
import { useState } from "react";
import { deleteAccFunction } from "../Services/API";
import { FaSpinner } from "react-icons/fa";

const Home = () => {
  const [formLoading, setFormLoading] = useState(false);

  const name = sessionStorage.getItem("name");
  const registrationNo = sessionStorage.getItem("registrationNo");
  const mongoDbId = sessionStorage.getItem("id");

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    ToastMsg("Logging out!", "info");
    // Refresh the website after a 1-second delay
    setTimeout(() => {
      window.location.reload(); // Refreshes the page
    }, 1000);
  };

  const handleDeleteAcc = async () => {
    setFormLoading(true);
    try {
      const response = await deleteAccFunction(registrationNo);

      if (response.status == 200) {
        ToastMsg(response.data.message, "success");
        // Clear session storage
        sessionStorage.clear();
        // Refresh the website after a 1-second delay
        setTimeout(() => {
          window.location.reload(); // Refreshes the page
        }, 1000);
      } else {
        ToastMsg(response.response.data.message, "error");
      }
    } catch (error) {
      console.log("Internal Server Error: ", error);
      ToastMsg("Internal Server Error", "error");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="login-area w-full h-screen flex justify-center items-center pt-[80px] sm:pt-[50px] pb-[50px]">
      <div className="box sm:w-full md:max-w-[600px] mx-auto sm:py-[50px]">
        <h2 className="text-gray-700 outline-none block text-[40px] xl:text-[44px] font-bold mx-auto mb-3 w-full text-center">
          Welcome {!name ? "" : name}
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <p className="mx-3">
            <strong>Reg no: </strong>
            {!registrationNo ? "" : registrationNo}
          </p>
          <p className="mx-3">
            <strong>MongoDB Id: </strong>
            {!mongoDbId ? "" : mongoDbId}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center">
          {/* Delete Account */}
          <div className="mt-3 text-center mx-5">
            <button
              type="submit"
              className={`btnDeleteAcc ${
                formLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleDeleteAcc}
            >
              {formLoading ? (
                <>
                  <FaSpinner className="mr-3 animate-spin" />
                  Loading...
                </>
              ) : (
                "Delete Account"
              )}
            </button>
          </div>

          {/* Reset Password */}
          <div className="mt-3 text-center mx-5">
            <Link to="/reset-password">
              <button type="submit" className="btnSubmit">
                Reset Password
              </button>
            </Link>
          </div>

          {/* Logout */}
          <div className="mt-3 text-center mx-5">
            <button type="submit" className="btnLogout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
