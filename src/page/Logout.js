import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LoginAction } from '../redux/Action'

export class Logout extends Component {

    
    componentDidMount(){
            
        this.props.LoginAction("","username")
        this.props.LoginAction("","token")
        this.props.LoginAction("","role")
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Apps Launched' }],
          })
    }

    render() {
        return (
            <View>
               
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    LoginAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
