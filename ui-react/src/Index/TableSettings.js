import React, { useState } from "react";
import ColumnSettings from "./ColumnSettings";
import Filter from "./Filter";
import TagFilter from "./TagFilter";
import { Collapse } from "react-bootstrap";

const TableSettings = (props) => {
  const [open, setOpen] = useState(false);

  const statusFilter = props.filters.find(f => f.category === "Status");
  const ownershipFilter = props.filters.find(f => f.category === "Ownership");

  return (
    <div>
      <div className="settings-card card">
        <div className="card-header">
            <span role="img" title="Open Settings" 
              aria-label="Open Settings"
              aria-controls="example-collapse-text2"
              aria-expanded={ open }
              onClick={ () => setOpen(!open) }
            >⚙️</span>
        </div>
        <Collapse in={ open }>
          <div id="example-collapse-text2">
            <div className="card-body row">
              <div className="col-lg-6">
                <ColumnSettings columns={ props.columns } onColumnChange={ props.onColumnChange }/>
              </div>
              <div className="col-lg-6">
                <h4>Filter</h4>
                <Filter
                  categoryName="Status" 
                  options={ statusFilter.options } 
                  enabled={ statusFilter.enabled } 
                  setFilterEnabledStatus={ props.setFilterEnabledStatus } 
                  onFilterChange={ props.onFilterChange } />
                <Filter 
                  categoryName="Ownership" 
                  options={ ownershipFilter.options } 
                  enabled={ ownershipFilter.enabled } 
                  setFilterEnabledStatus={ props.setFilterEnabledStatus } 
                  onFilterChange={ props.onFilterChange } />
                <TagFilter enabled={ props.tagFilters.length > 0 } 
                  selected={ props.tagFilters } availableTags={ props.availableTags }
                  onChange={ props.onTagFilterChange } clearTagFilters={ props.clearTagFilters } />
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default TableSettings;
