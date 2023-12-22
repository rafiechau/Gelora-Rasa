import PropTypes from 'prop-types';
import classes from './style.module.scss';

const AdminTable = ({ columns, data, onEdit, onDelete, showEditButton = true }) => (
  <div className={classes.responsiveTableContainer}>
    <table className={classes.responsiveTable}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column.label}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={`${item.id}-${column.id}`}>{item[column.id]}</td>
            ))}
            <td className={classes.actions}>
              {showEditButton && (
                <button type="button" onClick={() => onEdit(item)} className={`${classes.btn} ${classes.btnDetail}`}>
                  Edit
                </button>
              )}
              <button type="button" onClick={() => onDelete(item.id)} className={`${classes.btn} ${classes.btnDelete}`}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

AdminTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  showEditButton: PropTypes.bool,
};

export default AdminTable;
