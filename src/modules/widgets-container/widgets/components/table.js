import React, {Component} from 'react';
class Table extends Component {
    render() {
        const {config} = this.props;
        if (config.columns) {
            const Header = config.columns.map((columnName) => {
                return <th key={columnName}>{columnName}</th>
            })
            const Rows = config.list.map((row) => {
                const columnData = config.columns.map((columnName) => {
                    return <td key={columnName}>{row.columnData[columnName]}</td>
                })
                return <tr key={row.id}>{columnData}</tr>
            })
            return (
                <div>
                    <div class="text-center"><h4>{config.title}</h4></div>
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    {Header}
                                </tr>
                            </thead>
                            <tbody>
                                {Rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        else {
            return <div></div>
        }
    }
}
export default Table;