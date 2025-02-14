import PropTypes from 'prop-types';

const Role = ({ setSelectedRole, selectedRole, role, children }) => {
  return (
    <div
      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
        selectedRole === role ? "border-black bg-gray-200" : "border-gray-300"
      }`}
      onClick={() => setSelectedRole(role)}
    >
      {children}
    </div>
  );
};

Role.propTypes = {
  setSelectedRole: PropTypes.func.isRequired,
  selectedRole: PropTypes.string,
  role: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Role;
