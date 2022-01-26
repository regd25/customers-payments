import React, { useState } from 'react';

const Header = ({ titles, ...rest }) =>
    titles.length > 0 &&
    titles.map((title, index) =>
        <th key={index} {...rest}>{title}</th>
    )

const Footer = ({ children }) => (
    <tr>
        <td>
            {children}
        </td>
    </tr>
)
const Columns = ({ data }) => (
    <>
        {Object.values(data).map((column, index) => typeof column !== 'object' && <td key={index}>{column}</td>)}
    </>
)
const ExpansibleRow = ({ detail, onDetail, render }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <tr>
                {render}
                <td>
                    <span className="expansible-row-button material-icons" onClick={() => setIsOpen(!isOpen)}>expand_more</span>
                </td>
            </tr>
            {isOpen && onDetail(detail)}
        </>
    )
}

const Table = ({ children, ...rest }) => (
    <table className="table-users" {...rest}>
        {children}
    </table>
)

Table.Header = Header
Table.Footer = Footer
Table.Columns = Columns
Table.ExpansibleRow = ExpansibleRow

export default Table;