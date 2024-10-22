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
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [FriendSelect, setFriendSelect] = useState(null);

  const handleShowAddFriend = () => {
    setshowAddFriend((val) => !val);
  };

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setshowAddFriend(false);
  };

  const handleSelection = (friend) => {
    setFriendSelect(FriendSelect !== friend ? friend : null);
    setshowAddFriend(false);
  };

  const handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === FriendSelect.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setFriendSelect(null);
  };
  return (
    <>
      <h1 className="logo">Eat-n-Split</h1>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            onSelection={handleSelection}
            FriendSelect={FriendSelect}
          />
          {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
          <Button onclick={handleShowAddFriend}>
            {showAddFriend ? "Close" : "Add Friend"}
          </Button>
        </div>
        {FriendSelect && (
          <FormSplitBill
            FriendSelect={FriendSelect}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </>
  );
}

const FriendsList = ({ friends, onSelection, FriendSelect }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          FriendSelect={FriendSelect}
        />
      ))}
    </ul>
  );
};

const Friend = ({ friend, onSelection, FriendSelect }) => {
  const isSelected = FriendSelect === friend;
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onclick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

const FormSplitBill = ({ FriendSelect, onSplitBill }) => {
  const [bill, setbill] = useState("");
  const [userPay, setUserPay] = useState("");
  const paidByFriend = bill ? bill - userPay : "";
  const [whoIsPaying, setWhoISPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !userPay) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -userPay);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {FriendSelect.name}</h2>
      <label>💰Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setbill(e.target.value)}
      />

      <label>🕴️Your expense</label>
      <input
        type="text"
        value={userPay}
        onChange={(e) =>
          setUserPay(
            Number(e.target.value) > bill ? userPay : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑{FriendSelect.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoISPaying(Number(e.target.value))}
      >
        <option value="user">You</option>
        <option value="friend">{FriendSelect.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
};
