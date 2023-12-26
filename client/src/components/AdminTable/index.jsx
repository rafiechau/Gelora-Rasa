import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const AdminTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  showEditButton = true,
  showDeleteButton = true,
  editButtonMessageId = 'app_btn_view_details',
}) => (
  <div className={classes.responsiveTableContainer} data-testid="admin-table">
    <table className={classes.responsiveTable}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>
              <FormattedMessage id={column.messageId} defaultMessage={column.label} />
            </th>
          ))}
          <th>
            <FormattedMessage id="app_header_actions" />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={`${item.id}-${column.id}`}>{item[column.id]}</td>
            ))}
            <td className={classes.actions} data-testid={`row-actions-${index}`}>
              {showEditButton && (
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className={`${classes.btn} ${classes.btnDetail}`}
                  data-testid={`edit-button-${item.id}`}
                >
                  <FormattedMessage id={editButtonMessageId} />
                </button>
              )}
              {showDeleteButton && ( // Kondisional untuk menampilkan tombol delete
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className={`${classes.btn} ${classes.btnDelete}`}
                  data-testid={`delete-button-${item.id}`}
                >
                  <FormattedMessage id="app_btn_delete" />
                </button>
              )}
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
  onDelete: PropTypes.func,
  showEditButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  editButtonMessageId: PropTypes.string,
};

export default AdminTable;
