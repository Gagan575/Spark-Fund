import Select from "react-select"
import { toast } from "react-toastify"

const TeamSelect = ({ team, teamId, setTeamId }) => {
  const options = team.map(t => ({
    value: t._id,
    label: t.teamName
  }))

  const handleChange = (selected) => {
    if (selected.length > 2) {
      toast.error("You can select only 2 teams")
      return
    }
    setTeamId(selected.map(s => s.value))
  }

  return (
    <div className="form-group mb-4">
      <label className="fw-bold">Select 2 Teams</label>

      <Select
        options={options}
        required
        isMulti
        value={options.filter(o => teamId.includes(o.value))}
        onChange={handleChange}
        placeholder="Choose teams..."
        closeMenuOnSelect={false}
        className="react-select-container"
        classNamePrefix="react-select"
      />

      <small className="text-muted">
        Selected {teamId.length}/2 teams
      </small>
    </div>
  )
}

export default TeamSelect
