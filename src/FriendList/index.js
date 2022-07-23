import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

import {
	RiArrowLeftLine,
	RiArrowRightLine,
	RiDeleteBin6Line,
} from "react-icons/ri";
import * as actions from "./actions";
import "./friendlist.css";

const FriendList = (props) => {
	const [friendList, setFriendList] = useState([]);
	const [newFriend, setNewFriend] = useState("");
	const [filteredList, setFilteredList] = useState([]);
	const [searchList, setSearchList] = useState([]);
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(0);
	const [count, setCount] = useState(0);
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);

	const rowsPerPage = 5;

	const onChangehandler = (e) => {
		setNewFriend(e.target.value);
	};
	const addFriend = (e) => {
		e.preventDefault();

		var regName = /^[a-zA-Z ]+$/;

		if (regName.test(newFriend)) {
			let newId = friendList.reduce((num, current) => {
				return num > current.id ? num : current.id;
			}, 0);

			let addFriendpayload = {
				id: newId + 1,
				name: newFriend,
				favourite: false,
			};
			setNewFriend("");
			props.addFriendHandler(addFriendpayload);
		} else {
			setNewFriend("");
			alert("Special character and numbers and not allowed");
		}
	};

	const onChanngeHandler = (e) => {
		let val = e.target.value;
		let filteredList = props.friendList.filter((item) =>
			item.name.toLowerCase().includes(val.toLowerCase())
		);
		setSearchList([...filteredList]);
	};

	const updateFavourite = (item) => {
		props.faouriteFriendHandler(item);
	};
	const updateDelete = (item) => {
		props.deleteFriendHandler(item);
	};
	const nextPageChange = () => {
		if (page != pageCount) {
			let value = page + 1;

			let start = page * rowsPerPage;
			let end = value * rowsPerPage;
			end = end > props.friendList.length ? props.friendList.length : end;
			setStart(start + 1);
			setEnd(end);

			const filteredData = props.friendList.slice(start, end);

			setPage(value);
			setFilteredList([...filteredData]);
		}
	};

	const backPage = () => {
		if (page != 1) {
			let value = page - 1;
			let start = page - 2 <= 0 ? 0 : (page - 2) * rowsPerPage; // 3-2 *10 =10
			start = start < 0 ? 0 : start;
			let end = value * rowsPerPage; //2*10 = 20

			setStart(start + 1);
			setEnd(end);

			const filteredData = props.friendList.slice(start, end);

			setPage(value);
			setFilteredList([...filteredData]);
		}
	};

	useEffect(() => {
		var start = 1;
		var end = 1;
		setCount(searchList.length);
		if (searchList.length == 0) {
			end = 0;
			setEnd(0);
			setPageCount(0);
			setPage(0);
		} else if (searchList.length <= 5) {
			end = searchList.length;
			setEnd(searchList.length);
			setPageCount(1);
			setPage(1);
			setStart(1);
		} else if (searchList.length != 0) {
			start = 1;
			end = 5;
			setStart(1);
			setPage(1);
			setPageCount(Math.ceil(searchList.length / 5));
			setEnd(5);
		}

		setFilteredList(searchList.slice(start - 1, end));
	}, [searchList]);

	const pageChange = () => {
		var start = 1;
		var end = 1;
		setCount(props.friendList.length);
		if (props.friendList.length == 0) {
			end = 0;
			setEnd(0);
			setPageCount(0);
			setPage(0);
		} else if (props.friendList.length <= 5) {
			end = props.friendList.length;
			setEnd(props.friendList.length);
			setPageCount(1);
			setPage(1);
			setStart(1);
		} else if (props.friendList.length != 0) {
			start = 1;
			end = 5;
			setStart(1);
			setPage(1);
			setPageCount(Math.ceil(props.friendList.length / 5));
			setEnd(5);
		}

		setFilteredList(props.friendList.slice(start - 1, end));
	};
	useEffect(() => {
		setFriendList(
			props.friendList.sort((a, b) => (a.favourite > b.favourite ? -1 : 1))
		);
		pageChange();
	}, [props.friendList]);

	useEffect(() => {
		setFriendList(
			props.friendList.sort((a, b) => (a.favourite > b.favourite ? -1 : 1))
		);
		pageChange();
	}, []);
	return (
		<div className="mainContainer">
			<h4>Welcome User</h4>
			<div className="container">
				<form className="form" onSubmit={(e) => addFriend(e)}>
					<input
						onChange={(e) => onChangehandler(e)}
						className="search"
						type="text"
						placeholder={"Enter Friend Name to Add"}
						value={newFriend}
					/>
					<button type="submit" color="primary" className="button">
						Add Friend
					</button>
				</form>
				<div className="listContainer">
					<div className="header">
						<h4 className="headerText">Friends List</h4>
					</div>

					<div className="searchContainer">
						<input
							type={"text"}
							className="listSearch"
							onChange={(e) => onChanngeHandler(e)}
							placeholder="Search a Friend"
						/>
					</div>

					<div className="friendList">
						{filteredList.length != 0 ? (
							filteredList.map((item, index) => {
								return (
									<div className="friendRow" id={index}>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												height: "100%",
												width: "60%",
												justifyContent: "flex-start",
											}}
										>
											<p
												style={{
													fontSize: "14px",
													height: "60%",

													margin: 0,
													padding: "2% 2% 0 2%",
													justifyContent: "flex-start",
													alignItems: "flex-start",
													textAlign: "left",
												}}
											>
												{item.name}
											</p>
											<p
												style={{
													height: "40%",

													justifyContent: "flex-start",
													alignItems: "flex-start",
													margin: 0,
													padding: "0 2%",
													textAlign: "left",
													color: "grey",
												}}
											>
												is your Friend
											</p>
										</div>
										<div
											style={{
												flexDirection: "row",
												display: "flex",
												width: "40%",
												height: "100%",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<div
												style={{
													width: "50%",
													height: "70%",
													border: "solid 1px #EAEAEA",
													fontSize: "20px",
													justifyContent: "center",
													alignItems: "center",
													textAlign: "center",
													paddingTop: "8%",
													cursor: "pointer",
												}}
											>
												{item.favourite ? (
													<AiTwotoneStar
														onClick={() => updateFavourite(item)}
													/>
												) : (
													<AiOutlineStar
														onClick={() => updateFavourite(item)}
													/>
												)}
											</div>
											<div
												style={{
													width: "50%",
													height: "70%",
													border: "solid 1px #EAEAEA",
													fontSize: "20px",
													justifyContent: "center",
													alignItems: "center",
													textAlign: "center",
													paddingTop: "8%",
													cursor: "pointer",
												}}
											>
												<RiDeleteBin6Line onClick={() => updateDelete(item)} />
											</div>
										</div>
									</div>
								);
							})
						) : (
							<div
								style={{
									alignItem: "center",
									justifyContent: "center",
									height: "100%",
								}}
							>
								<p>Friend List Empty</p>
							</div>
						)}
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "flex-start",
							fontSize: "14px",
							flex: 2,
							width: "100%",
						}}
					>
						<p
							style={{
								width: "55%",
								marginLeft: "10%",
								textAlign: "left",
								fontSize: "12px",
							}}
						>
							Showing {start}-{end} of {count}
						</p>
						{page != 0 && (
							<div
								style={{
									width: "45%",
									display: "flex",
									flexDirection: "row",
									justifyItems: "center",
									alignItems: "center",
								}}
							>
								<RiArrowLeftLine
									onClick={() => backPage()}
									style={{ padding: "0 3%", cursor: "pointer" }}
									color={page == 1 ? "grey" : "black"}
								/>
								{pageCount == 1 ? (
									<p style={{ fontWeight: "bold" }}>{page}</p>
								) : pageCount == 2 ? (
									<p>
										<span style={{ fontWeight: page == 1 ? "bold" : null }}>
											1{" "}
										</span>
										-{" "}
										<span style={{ fontWeight: page == 2 ? "bold" : null }}>
											2
										</span>
									</p>
								) : pageCount == 3 ? (
									<p>
										<span style={{ fontWeight: page == 1 ? "bold" : null }}>
											1{" "}
										</span>
										-{" "}
										<span style={{ fontWeight: page == 2 ? "bold" : null }}>
											2
										</span>
										-{" "}
										<span style={{ fontWeight: page == 3 ? "bold" : null }}>
											3
										</span>
									</p>
								) : (
									<p>
										<span style={{ fontWeight: page == 1 ? "bold" : null }}>
											1
										</span>{" "}
										-{" "}
										<span style={{ fontWeight: page != 1 ? "bold" : null }}>
											{page == 1 ? Math.ceil(pageCount / 2) : page} -{" "}
										</span>
										{pageCount}
									</p>
								)}
								<RiArrowRightLine
									onClick={() => nextPageChange()}
									style={{ padding: "0 3%", cursor: "pointer" }}
									color={page == pageCount ? "grey" : "black"}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => {
	const { friendList } = state.FriendReducer;

	return { friendList };
};
const mapDispatchToProps = (dispatch, props) => ({
	addFriendHandler: (payload) => {
		dispatch({ type: actions.ADD_FRIEND, payload });
	},

	deleteFriendHandler: (payload) => {
		dispatch({ type: actions.DELETE_FRIEND, payload });
	},
	fetchFriendhandler: () => {
		dispatch({ type: actions.FETCH_FRIEND_LIST });
	},
	faouriteFriendHandler: (payload) => {
		dispatch({ type: actions.FAVOURITE_FRIEND, payload });
	},
});
export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
