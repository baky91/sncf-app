function PhysicalModeSelect({station, physicalMode, setPhysicalMode}) {
  return (
    <div className='select-physical-mode'>
      <div className='select-physical-mode__container'>
        <ul className='select-physical-mode__list'>
          <li onClick={() => setPhysicalMode(null)}>
            <button className={!physicalMode ? 'active' : ''}>
              Toutes les lignes
            </button>
          </li>
          {station?.physical_modes.map((mode, index) => (
            <li key={`${mode}-${index}`}>
              <button
                className={physicalMode === mode.id ? 'active' : ''}
                onClick={() => {
                  setPhysicalMode(mode.id)
                }}
              >
                {mode.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PhysicalModeSelect
