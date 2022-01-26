import React from 'react';
import "./PaginationSelector.css"

const PaginationSelector = ({ page, totalPages, onPageChange, onLimitChange }) => {
    const handlePageChange = (e) => {
        if(e.target.id === "back") {
            if(page > 0) {
                return onPageChange(page - 1)
            }
            return
        }
        if(e.target.id === "forward") {
            if(page < totalPages) {
                return onPageChange(page + 1)
            }
            return
        }
    }
    return (
        <div className="pagination-container">
            <span className="pagination-icons material-icons" id="back" onClick={handlePageChange}>arrow_back_ios</span>
            <span className="pagination-title">{page} / {totalPages}</span>
            <span className="pagination-icons material-icons" id="forward" onClick={handlePageChange}>arrow_forward_ios</span>
        </div>
    )
}

export default PaginationSelector;