import { BiCommentDetail } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";


const FriendRequestIcon = ({ count, handleClick }) => {
    return (
      <div style={{ position: "relative", display: "inline-block", cursor: "pointer" }} onClick={handleClick}>
        <BiCommentDetail  size={24} />
        {count > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "3px 7px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {count}
          </span>
        )}
      </div>
    );
  };

export default FriendRequestIcon;