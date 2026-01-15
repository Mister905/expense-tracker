import React from "react";
import "../styles/components/_Filters.scss";

const Filters = ({ filters, setFilters }) => {
  return (
    <>
      <h1 className="heading-filters">Filters</h1>

      <div className="filters">
        <div>
          <label htmlFor="vendorFilter">
            Vendor:{` `}
            <input
              id="vendorFilter"
              name="vendorFilter"
              type="text"
              placeholder="Filter by vendor"
              value={filters.vendor}
              onChange={(e) =>
                setFilters({ ...filters, vendor: e.target.value })
              }
            />
          </label>
        </div>

        <div>
          <label htmlFor="categoryFilter">
            Category:{` `}
            <input
              id="categoryFilter"
              name="categoryFilter"
              type="text"
              placeholder="Filter by category"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            />
          </label>
        </div>

        <div>
          <label htmlFor="startDateFilter">
            Start Date (include expenses on or after this date):{" "}
            <input
              id="startDateFilter"
              name="startDateFilter"
              type="date"
              placeholder="Filter by start date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
          </label>
        </div>

        <div>
          <label htmlFor="endDateFilter">
            End Date (include expenses on or before this date):{" "}
            <input
              id="endDateFilter"
              name="endDateFilter"
              type="date"
              placeholder="Filter by end date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default Filters;
