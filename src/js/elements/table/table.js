import React, { Component } from 'react';

import Toolbar from '../toolbar/toolbar';


class Table extends Component {

  constructor(props) {
    super(props);
      this.state = {
          data: this.props.data,
          sortby: null,
          descending: false,
          edit: null, // [row index, cell index]
          search: false
      }
  }

  preSearchData: null

  toggleSearch(e) {
    if (this.state.search) {
        this.setState({
            data: this.preSearchData,
            search: false,
        });
        this.preSearchData = null;
    } else {
        this.preSearchData = this.state.data;
        this.setState({
            search: true,
        });
    }
  }

  renderSearch() {
    if (!this.state.search) {
      return false;
    }
      return (
        <tr onChange={(e) => this.search(e)}>
          {
            this.props.headers.map((item, index) => {
              return (
                <td key={index}>
                    <input data-index={index} type='text'/>
                </td>
              )
            })
          }
         </tr>
      )

  }

  search(e) {
    var needle = e.target.value.toLowerCase();
    if (!needle) { // строка поиска будет удалена
        this.setState({data: this.preSearchData});
        return; }
    var idx = e.target.dataset.index; // в каком столбце искать
    var searchdata = this.preSearchData.filter((row) => {
        return row[idx].toString().toLowerCase().indexOf(needle)
            > -1;
    });
    this.setState({data: searchdata});
  }

  sort(e) {
      var column = e.target.cellIndex,
          data = this.state.data,
          descending = this.state.sortby === column && !this.state.descending;

      data.sort(function(a, b) {
          return descending
              ? (a[column] < b[column] ? 1 : -1)
              : (a[column] > b[column] ? 1 : -1);
      });
      this.setState({
          data: data,
          sortby: column,
          descending: descending,
      });
  }

  showEditor(e) {
      this.setState({edit: {
          row: parseInt(e.target.dataset.row, 10),
          cell: e.target.cellIndex,
      }});
  }

  save(e) {
      e.preventDefault();
      var input = e.target.firstChild,
          data = this.state.data;

      data[this.state.edit.row][this.state.edit.cell] = input.value;
      this.setState({
          edit: null, // редактирование выполнено
          data: data,
      });
  }

  render() {
    return (
      <div>
        <Toolbar handleClick={(e) => this.toggleSearch(e)}/>
        <table className="table">
            <thead onClick={(e) => this.sort(e)}>
            <tr>
                {
                    this.props.headers.map((item, key) => {
                        return (
                            <th key = {key}>{item}</th>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody onDoubleClick={(e) => this.showEditor(e)}>
            {
              this.renderSearch()
            }
            {
              this.state.data.map((row, rowIndex) => {
                  return (
                      <tr className="table__row" key={rowIndex}>
                          {
                              row.map((cell, cellIndex) => {
                                  var content = cell,
                                      edit = this.state.edit;

                                  if (edit && edit.row === rowIndex && edit.cell === cellIndex) {
                                      content =
                                          <form onSubmit={(e) => this.save(e)}>
                                              <input type="text" defaultValue={content} className="input"/>
                                          </form>
                                  }
                                  return (
                                      <td key={cellIndex}
                                          className="table__data"
                                          data-row={rowIndex}>
                                          {content}
                                      </td>
                                  )
                              })
                          }
                      </tr>
                  )
              })
            }
            </tbody>
        </table>
      </div>
    );
  }

}

Table.defaultProps = {
    headers: ['Roma', 'Andrey']
}

export default Table;
