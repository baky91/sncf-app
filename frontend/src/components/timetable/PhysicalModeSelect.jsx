function PhysicalModeSelect({station, physicalMode, setSearchParams}) {
  return (
    <div className='select-physical-mode'>
      <div className='select-physical-mode__container'>
        <ul className='select-physical-mode__list'>
          <li onClick={() => {
            setSearchParams(prev => {
              prev.set('physical_mode', 'all')
              return prev
            }, {replace: true})
            }}
          >
            <button className={physicalMode === 'all' ? 'active' : ''}>
              Toutes les lignes
            </button>
          </li>
          {station?.physical_modes.map((mode, index) => (
            <li key={`${mode}-${index}`}>
              <button
                className={physicalMode === mode.id ? 'active' : ''}
                onClick={() => {
                  setSearchParams(prev => {
                    prev.set('physical_mode', mode.id)
                    return prev
                  }, {replace: true})
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
