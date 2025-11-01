import React, { useRef, useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const ToastContent = () => {
  const [width, setWidth] = useState(100);
  useEffect(() => {
    let start = Date.now();
    const duration = 2500;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setWidth(Math.max(0, 100 - (elapsed / duration) * 100));
    }, 30);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div>Copied to clipboard!</div>
      <div
        style={{
          height: '5px',
          width: '100%',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
          marginTop: 8,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${width}%`,
            background: '#fff',
            borderRadius: '4px',
            transition: 'width 0.1s linear',
          }}
        ></div>
      </div>
    </div>
  );
};

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: '', username: '', password: '' });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    let passwords = localStorage.getItem('passwords');
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast(<ToastContent />, {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill="#22c55e" />
          <path
            d="M8 12.5L11 15.5L16 10.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      style: {
        background: '#22c55e',
        color: 'white',
        borderRadius: '1rem',
        fontWeight: 600,
        fontSize: '1rem',
        boxShadow: '0 4px 24px 0 rgba(34,197,94,0.15)',
        width: 'fit-content',
        minWidth: '220px',
        maxWidth: '90vw',
        paddingLeft: '5px',
      },
      bodyStyle: {
        color: 'white',
      },
      theme: 'colored',
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes('icons/eyecross.png')) {
      ref.current.src = 'icons/eye.png';
      passwordRef.current.type = 'password';
    } else {
      passwordRef.current.type = 'text';
      ref.current.src = 'icons/eyecross.png';
    }
  };

  const savePassword = () => {
    if (
      form.site.trim().length < 3 ||
      form.username.trim().length < 3 ||
      form.password.trim().length < 3
    ) {
      toast.error('All fields must be at least 3 characters long!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        style: {
          background: '#ef4444',
          color: 'white',
          borderRadius: '1rem',
          fontWeight: 600,
          fontSize: '1rem',
          boxShadow: '0 4px 24px 0 rgba(239,68,68,0.15)',
          width: 'fit-content',
          minWidth: '220px',
          maxWidth: '90vw',
        },
        bodyStyle: {
          color: 'white',
        },
        theme: 'colored',
      });
      return;
    }

    if (editId) {
      const updatedArray = passwordArray.map((item) =>
        item.id === editId ? { ...form, id: editId } : item
      );
      setPasswordArray(updatedArray);
      localStorage.setItem('passwords', JSON.stringify(updatedArray));
      setEditId(null);
    } else {
      const newItem = { ...form, id: uuidv4() };
      const newArray = [...passwordArray, newItem];
      setPasswordArray(newArray);
      localStorage.setItem('passwords', JSON.stringify(newArray));
    }

    setform({ site: '', username: '', password: '' });
  };

  const editPassword = (id) => {
    const item = passwordArray.find((i) => i.id === id);
    if (item) {
      setform({
        site: item.site,
        username: item.username,
        password: item.password,
      });
      setEditId(id);
    }
  };

  const deletePassword = (id) => {
    const updated = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updated);
    localStorage.setItem('passwords', JSON.stringify(updated));
  };

  const handleChnage = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mycontainer px-4 min-h-[83.3vh]">
        <h1 className="logo font-bold text-white text-4xl text-center">
          <span className="text-green-400"> &lt;</span>
          <span className="text-black"> Pass</span>
          <span className="text-green-400">OP /&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Paasword Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-6 items-center">
          <input
            value={form.site}
            onChange={handleChnage}
            className="rounded-full border border-green-500 w-full p-4 py-1"
            placeholder="Enter Website URL"
            type="text"
            name="site"
          />
          {/* Responsive fix: stack on small screens */}
          <div className="flex flex-col sm:flex-row w-full gap-6">
            <input
              value={form.username}
              onChange={handleChnage}
              className="rounded-full border border-green-500 w-full p-4 py-1"
              placeholder="Enter Username"
              type="text"
              name="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChnage}
                className="rounded-full border border-green-500 w-full p-4 py-1 pr-10"
                placeholder="Enter Password"
                type="password"
                name="password"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  width={26}
                  src="/icons/eye.png"
                  alt="Show/Hide Password"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center gap-2 items-center bg-green-400 hover:bg-green-300 rounded-full px-5 py-2 cursor-pointer w-fit border border-green-900 font-bold text-lg"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords overflow-x-auto">
          <h2 className=" text-2xl py-4 font-bold">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full min-w-[600px]">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={item.id || index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: '25px',
                                height: '25px',
                                paddingTop: '3px',
                                paddingLeft: '3px',
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: '25px',
                                height: '25px',
                                paddingTop: '3px',
                                paddingLeft: '3px',
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: '25px',
                                height: '25px',
                                paddingTop: '3px',
                                paddingLeft: '3px',
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border border-white text-center ">
                        <span
                          className="mx-2 cursor-pointer"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: '25px', height: '25px' }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: '25px', height: '25px' }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default Manager;
