import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "Jennifer Bayless",
    avatar: "/path/to/avatar1.jpg",
    added: false,
  },
  {
    id: 2,
    name: "Timothy Miller",
    avatar: "/path/to/avatar2.jpg",
    added: true,
  },
  { id: 3, name: "Mark Segura", avatar: "/path/to/avatar3.jpg", added: false },
  {
    id: 4,
    name: "Annett Poythress",
    avatar: "/path/to/avatar4.jpg",
    added: true,
  },
  {
    id: 5,
    name: "Jennifer Bayless",
    avatar: "/path/to/avatar5.jpg",
    added: false,
  },
];

const Group = ({ open, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(users);

  // hàm bậc trạng thái thêm người dùng
  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, added: !user.added } : user
      )
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <div className="p-6 bg-white rounded-lg">
          {/* Title */}
          <DialogTitle className="text-center text-xl font-semibold text-blue-600">
            Create a group
          </DialogTitle>

          {/* Upload & Input */}
          <div className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
              📷
            </div>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Name your group"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          {/* Search Input */}
          <div className="relative mt-4">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search for people to add"
              className="pl-10 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* User List */}
          <div className="mt-4 space-y-2">
            {selectedUsers
              .filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <Button
                    variant="contained"
                    color={user.added ? "success" : "primary"}
                    onClick={() => toggleUser(user.id)}
                  >
                    {user.added ? "✔ Added" : "+ Add"}
                  </Button>
                </div>
              ))}
          </div>

          {/* Actions */}
          <DialogActions className="mt-4">
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Create
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

//Dòng code này dùng PropTypes để kiểm tra kiểu dữ liệu của props được truyền vào component Group.

export default Group;
