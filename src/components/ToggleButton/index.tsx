import './index.scss'

interface ToggleButtonProps {
  value: boolean;
  onChange: () => void;
}

const ToggleButton = ({ value, onChange }: ToggleButtonProps) => {
  return (
    <label className="switch">
      <input
        type="checkbox" checked={value}
        onChange={onChange} />
      <span className="slider round"></span>
    </label>
  )
}

export default ToggleButton
