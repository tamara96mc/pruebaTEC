import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './show_registers.scss';
import Pagination from '../../Components/Pagination/Pagination';





const ShowUsers = () => {
    const history = useNavigate();


    let PageSize = 5;

    const [currentPage, setCurrentPage] = useState(0);


    const [pedidosActivos, setPedidosActivos] = useState([]);

    const [userdelete, setuserdelete] = useState([]);





    useEffect(() => {
        take_registers();

    }, []);




    const take_registers = async () => {

        try {

            let res = await axios.get("https://dynamiza-back-end.herokuapp.com/movies/");
            setPedidosActivos(res.data);
            setCurrentPage(1);
        } catch (error) {
            console.log(error);
        }


    };


    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return pedidosActivos.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    const deleteuser = async (data) => {
        /* let body = {
             id: user.id,
         }*/
        //Conexion a axios y envio de datos
        //console.log("ENVIANDO AL BACKEND ESTO....", body);
        try {
            let res = await axios.delete(`https://dynamiza-back-end.herokuapp.com/movies/${data}`);


            console.log("dentro del try,orrado", res);

            setuserdelete("Usuario borrado, recarga la página para comprobarlo");


        } catch (error) {
            console.log("error de front", error);
        }
    }



    return (

        <>
            {currentTableData
                ?

                <>
                    <div>
                        <p> Usuarios registrados</p>

                        <div className="show-register-table">
                            <div className="structure-table-v w-3">
                                <p className="colum-components-admin-print-register">
                                    ID
                                </p>
                            </div>
                            <div className="structure-table-v w-7">
                                <p className="colum-components-admin-print-register">
                                    Nombre
                                </p>
                            </div>
                            <div className="structure-table-v">

                                <p className="colum-components-admin-print-register w-16">
                                    Fecha creación
                                </p>
                            </div>
                        </div>

                        {currentTableData.map(run => {
                            return (
                                <div className="show-register-table" key={`id-${run.id}`}>
                                    <div className="structure-table-v w-3">
                                        <p className="colum-components-admin-print-register" >
                                            {run.id}
                                        </p>
                                    </div>
                                    <div className="structure-table-v w-7">
                                        <p className="colum-components-admin-print-register" >
                                            {run.title}
                                        </p>
                                    </div>
                                    <div className="structure-table-v">
                                        <p className="colum-components-admin-print-register w-16" >
                                            {run.createdAt}
                                        </p>
                                    </div>
                                    <div className="structure-table-v">
                                        <button className="deleteButton colum-components-admin-print-register w-9" onClick={() => deleteuser(run.id)}><p>Borrar usuario</p></button>
                                    </div>


                                </div>
                            )
                        })}

                    </div>
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={pedidosActivos.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </>
                :
                <div className="img-load">
                    <p className="no-pedidos">No hay usuarios</p>
                </div>
            }

        </>
    )

}


export default ShowUsers;
