import React, { useState } from 'react'
import './Navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateGroupBy, updateOrderBy } from '../../Redux/Slices/AppSlice'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { useRef } from 'react'
const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const dispatch = useDispatch()
  const { groupBy, orderBy } = useSelector((state) => state.info)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setToggle(false))
  function clickHandler() {
    setToggle((prev) => !prev)
  }
  function handleGrouping(e) {
    setToggle((prev) => !prev)
    if (e.target.value !== undefined) {
      dispatch(updateGroupBy(e.target.value))
    }
  }
  function handleOrdering(e) {
    setToggle((prev) => !prev)
    if (e.target.value !== undefined) {
      dispatch(updateOrderBy(e.target.value))
    }
  }
  return (
    <section className='nav'>
      <div className='nav-container'>
        <div className='nav-disp-btn' onClick={clickHandler}>
          <div className='nav-disp-icon nav-disp-filter'>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill='#808184'><g transform="rotate(-90 10 10)"><path d="M17 16v4h-2v-4h-2v-3h6v3h-2zM1 9h6v3H1V9zm6-4h6v3H7V5zM3 0h2v8H3V0zm12 0h2v12h-2V0zM9 0h2v4H9V0zM3 12h2v8H3v-8zm6-4h2v12H9V8z" /></g></svg>
          </div>
          <div className="nav-disp-heading">
            Display
          </div>
          <div className="nav-disp-icon nav-disp-drop">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48"><path fill="none" stroke="#808184" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M36 18L24 30L12 18" /></svg>
          </div>
        </div>
        <div className={toggle ? "nav-disp-dropdown nav-disp-dropdown-show" : "nav-disp-dropdown"} ref={ref}>
          <div className="nav-disp-filters">
            <div className="nav-dropdown-category">
              Grouping
            </div>
            <div className="nav-dropdown-selector">
              <select value={groupBy} onChange={handleGrouping} className='nav-selector' name="grouping">
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
          <div className="nav-disp-filters">
            <div className="nav-dropdown-category">
              Ordering
            </div>
            <div className="nav-dropdown-selector">
              <select value={orderBy} onChange={handleOrdering} className='nav-selector' name="ordering">
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Navbar