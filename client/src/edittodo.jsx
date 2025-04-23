import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const Edit = () => {
  const navigate = useNavigate();
  const { user, index } = useParams();
  const [title, setTitle] = useState("");
  const [isPending, setIsPending] = useState(false);

  const HandleEdit = (e) => {
    e.preventDefault();
    setIsPending(true);

    axios
      .put("http://localhost:4000/edittodo", {
        name: user,
        index: index,
        todoItem: title,
      })
      .then(() => {
        navigate(`/${user}/home`);
        navigate(0);
      })
      .catch((err) => {
        console.error("Error editing todo:", err);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <div>
      <Navbar userid={user} />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-4 rounded w-25">
          <h2 className="text-center mb-4" style={{ color: "black" }}>
            Edit Todo!
          </h2>
          <form onSubmit={HandleEdit}>
            <div className="mb-3">
              <label htmlFor="todoTitle" className="form-label">
                <strong>
                  <h5 style={{ color: "black" }}>New Todo Title:</h5>
                </strong>
              </label>
              <input
                id="todoTitle"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control rounded-0"
              />
            </div>
            {!isPending && (
              <button type="submit" className="btn btn-primary w-100 rounded-0">
                Edit Todo
              </button>
            )}
            {isPending && (
              <button disabled className="btn btn-secondary w-100 rounded-0">
                Editing Todo...
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;