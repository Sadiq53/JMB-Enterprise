import React, { useEffect, useRef, useState } from 'react';
import Header from '../../shared/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { handleDeleteFile, resetState } from '../../../../redux/AdminDataSlice';
import { NavLink, useParams } from 'react-router-dom';
import DeleteDataModal from './DeleteDataModal';
import DashboardTags from '../../shared/DashboardTags/DashboardTags';

const DeleteData = () => {
  const dispatch = useDispatch();
  const getRoute = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const RawFileData = useSelector((state) => state.AdminDataSlice?.file);
  const isError = useSelector((state) => state.AdminDataSlice?.isError);
  const isFullfilled = useSelector((state) => state.AdminDataSlice?.isFullfilled);
  const [breakDownFIleName, setBreakDownFIleName] = useState([]);
  const [filteredFileNames, setFilteredFileNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteFiles, setDeletFiles] = useState([]);
  const resetForm = useRef();

  const handleCheckboxChange = (whichDelete, value) => {
    if (whichDelete === 'select') {
      let getFileId = RawFileData?.filter((item) => item?.name === value)?.map((item) => item._id);
      getFileId = getFileId ?? [];
      setDeletFiles((prevState) => {
        const flatState = prevState.flat();
        const flatGetFileId = getFileId.flat();
        if (flatGetFileId.every((id) => flatState.includes(id))) {
          return flatState.filter((id) => !flatGetFileId.includes(id));
        } else {
          return [...new Set([...flatState, ...flatGetFileId])];
        }
      });
    } else {
      const getFileData = RawFileData?.map((item) => item?._id);
      setDeletFiles(getFileData ?? []);
      getFileData?.length !== 0 ? document.getElementById('deleteModal').classList.add('show') : null;
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = breakDownFIleName.filter((name) => name.toLowerCase().includes(query));
    setFilteredFileNames(filtered);
  };

  useEffect(() => {
    setDeletFiles([]);
  }, [RawFileData]);

  useEffect(() => {
    const names = RawFileData?.map(({ name }) => name) ?? [];
    setBreakDownFIleName(names);
    setFilteredFileNames(names);
  }, [RawFileData, isFullfilled]);

  useEffect(() => {
    if (isError) {
      setAlertMsg('Error in Deleting File, Try again later');
      setTimeout(() => {
        setAlertMsg('');
      }, 5000);
      dispatch(resetState());
    }
  }, [isError]);

  useEffect(() => {
    if (isFullfilled) {
      setAlertMsg('Data Deleted Successfully');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setAlertMsg('');
      }, 3000);
      resetForm.current.click();
      dispatch(resetState());
    }
  }, [isFullfilled]);

  return (
    <>
      <Header />
      <DashboardTags />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="font-size-18">
                  {getRoute?.route === 'delete-data' ? 'Delete Data By List' : 'All Files'}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    handleCheckboxChange('bulk');
                  }}
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-trash-can"></i> Bulk Delete
                </button>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by file name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                {showAlert ? (
                  <div className="alert alert-success text-success">{alertMsg}</div>
                ) : null}
                <div className="my-3 dt-responsive table-responsive">
                  <table
                    id="table-style-hover"
                    className="table table-striped my-3 table-hover table-bordered nowrap dataTable"
                    aria-describedby="table-style-hover_info"
                  >
                    <thead>
                      <tr>
                        <th className="d-flex align-items-center justify-content-between">
                          File Name{' '}
                          <button
                            type="button"
                            onClick={() => {
                              handleCheckboxChange('bulk');
                            }}
                            className="btn btn-danger btn-md"
                          >
                            Delete
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFileNames.map((value) => (
                        <tr key={value}>
                          <td className="d-flex justify-content-between align-items-center">
                            <NavLink to={`/data/${value}`} className="text-decoration-none">
                              <h5>{value}</h5>
                            </NavLink>
                            <input
                              className="custom-checkbox"
                              onChange={() => {
                                handleCheckboxChange('select', value);
                              }}
                              type="checkbox"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteDataModal props={deleteFiles} />
    </>
  );
};

export default DeleteData;
