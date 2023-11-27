import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import { addData, addLoading, addError } from './Redux/Slices/AppSlice'
import { useSelector, useDispatch } from 'react-redux'
import List from './components/List/List';
function App() {
  const statusList = ['In progress', 'Backlog', 'Todo', 'Done', 'Cancelled']
  const userNames = ['Anoop sharma', 'Yogesh', 'Shankar Kumar', 'Ramesh', 'Suresh']
  const priorityList = [{ name: 'No priority', priority: 0 }, { name: 'Urgent', priority: 4 }, { name: 'High', priority: 3 }, { name: 'Medium', priority: 2 }, { name: 'Low', priority: 1 }]
  const { groupBy, orderBy, data } = useSelector((state) => state.info)

  const dispatch = useDispatch()
  async function orderData(apidata) {
    if (orderBy === 'priority') {
      apidata.sort((a, b) => b.priority - a.priority)
    }
    else if (orderBy == 'title') {
      apidata.sort((a, b) => {
        const title1 = a.title.toLowerCase()
        const title2 = b.title.toLowerCase()

        if (title1 < title2) {
          return -1
        }
        else if (title1 > title2) {
          return 1
        }
        else {
          return 0
        }
      })
    }
    dispatch(addData(apidata))
    dispatch(addLoading(false))
  }
  useEffect(() => {
    var newArr = [...data]
    orderData(newArr)
  }, [orderBy])

  function refractorData(res) {
    let apiData = []
    for (let i = 0; i < res.data.tickets.length; i++) {
      for (let j = 0; j < res.data.users.length; j++) {
        if (res.data.tickets[i].userId === res.data.users[j].id) {
          let dataJson = { ...res.data.tickets[i], userObj: res.data.users[j] }
          apiData.push(dataJson)
        }
      }
    }
    orderData(apiData)
  }

  useEffect(() => {
    const url = `https://api.quicksell.co/v1/internal/frontend-assignment`;
    dispatch(addLoading(true))
    axios.get(url)
      .then((res) => {
        refractorData(res)
      })
      .catch(err => {
        dispatch(addLoading(false))
        dispatch(addError(err))
      });
  }, []);

  const renderLists = () => {
    switch (groupBy) {
      case 'status':
        return statusList.map((listItem,index) => (
          <List
            key={index}
            listTitle={listItem}
            listIcon=''
            statusList={statusList}
          />
        ));
      case 'user':
        return userNames.map((listItem,index) => (
          <List
            key={index}
            listTitle={listItem}
            listIcon=''
            userList={userNames}
          />
        ));
      case 'priority':
        return priorityList.map((listItem,index) => (
          <List
            key={index}
            listTitle={listItem.priority}
            listIcon=''
            priorityList={priorityList}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <section className="board-details">
        <div className="board-details-list">
          {
            <>{renderLists()}</>
          }
        </div>
      </section>
    </>
  );
}

export default App;
