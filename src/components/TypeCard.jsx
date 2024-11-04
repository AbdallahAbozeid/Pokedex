import { pokemonTypeColors } from '../utils'
import PropTypes from 'prop-types'

export const TypeCard = (props) => {
    const { type } = props
    return (
        <p className='px-2 py-1 rounded-md' style={{ color: pokemonTypeColors?.[type]?.color, background: pokemonTypeColors?.[type]?.background }}>{type}</p>
    )
}
TypeCard.propTypes = {
    type: PropTypes.string.isRequried
}
