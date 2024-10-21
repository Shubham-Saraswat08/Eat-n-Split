import React, { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Tushar",
    image: "https://i.pravatar.cc/48?u=118824",
    balance: -7,
  },
  {
    id: 933372,
    name: "Mayank",
    image: "https://i.pravatar.cc/48?u=933323",
    balance: 20,
  },
  {
    id: 499476,
    name: "Utkarsh",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const Button = ({ children, onclick }) => {
  return (
    <button className="button" onClick={onclick}>
      {children}
    </button>
  );
};

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  console.log(friends);
  const [showAddFriend, setshowAddFriend] = useState(false);

  const handleShowAddFriend = () => {
    setshowAddFriend((val) => !val);
  };

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setshowAddFriend(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button onclick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

const FriendsList = ({ friends }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
};

const Friend = ({ friend }) => {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p
        className={
          friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : ""
        }
      >
        {friend.balance > 0
          ? `${friend.name} owes you ${friend.balance}$`
          : friend.balance === 0
          ? `You and ${friend.name} are even`
          : `You own ${friend.name} ${Math.abs(friend.balance)}$`}
      </p>
      <Button>Select</Button>
    </li>
  );
};

const FormAddFriend = ({ handleAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    handleAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🫂Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌇Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>💰Bill Value</label>
      <input type="text" />

      <label>🕴️Your expense</label>
      <input type="text" />

      <label>🧑‍🤝‍🧑X's expense</label>
      <input type="text" disabled />

      <label>🤑Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
};
