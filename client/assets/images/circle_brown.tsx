import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Log = () => {
    return(
        <Svg  viewBox="0 0 512 512" fill={'#806854'} height={'15'} width={'15'} >
            <Path d="M256 0C115.39 0 0 115.39 0 256s115.39 256 256 256 256-115.39 256-256S396.61 0 256 0z" />
        </Svg>
    ); 
}

export default Log;