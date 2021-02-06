import React, {useEffect, useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import {View, Text} from 'react-native';
import {navigate} from '../navigationRef';

const ResolveAuthScreen = () => {
    const { tryLocalSignIn } = useContext(AuthContext);
    useEffect(()=>{
        console.log("Inside resolve screen");
        tryLocalSignIn();
    }, []);
    return <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{alignSelf: 'center'}}>
            Resolve Auth Screen
        </Text>
    </View>;
}

export default ResolveAuthScreen;