import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Warehouse = () => {
    return(
        <Svg  viewBox="0 0 512 512" fill={'#b39c7d'} height={'60'} width={'100%'} >
            <Path d="M256 7.384L0 109.784v394.832h512V109.784L256 7.384zm160 465.232H96v-32h320v32zm0-64H96v-32h320v32zm0-64H96v-32h320v32zm0-64H96v-32h320v32zm64 192h-32v-256H64v256H32V131.448l224-89.6 224 89.6v341.168z" />
            <Path d="M144 136.616h32v32h-32zM208 136.616h96v32h-96zM336 136.616h32v32h-32z" />
        </Svg>
    ); 
}

export default Warehouse;