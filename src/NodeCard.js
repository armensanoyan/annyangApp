import React from 'react'
import styled from 'styled-components'

const StyledNodeCreateWindow  = styled(NodeCard)`
    width: 40vw;
    height: 50vh;
    display: flex;
`
const StyleInput = styled.input`
    margin-left: 1em;
    width: auto;
    background-color: #282c34;
    border-radius: 7px;
    font-size: 1em;
    display:inline;
    color: white;
    border-width: 0 0 2px 0
`

const StyledP = styled.p`
    font-size: 1em; 
    display: inline;
`
const StyleDiv = styled.div`
    margin: 1em
`
function NodeCard(props) {

    console.log('props', props)

    var defaultTextDiv = ''
    var NodeNameDiv = ''
    var NodeTypeDiv = ''
    var NodeCreateDiv = ''

    const ChangeName = e => {
        console.log(props)
        props.setState({...props.state, name:e.target.value})
    }
    const ChangeType = e => {
        console.log(props)
        props.setState({...props.state, type:e.target.value})
    }
    const createNode = () => {
        props.setState({
            ...props.state,
            command: false,
            name: null,
            type: null, 
        })
    }

    if (props.state.command === false) {
        defaultTextDiv = <h2>hi</h2>
    }
    if (props.state.command === true) {
        defaultTextDiv = <h2>Please give your node a name</h2>
    }

    if (props.state.name !== null) {
        NodeNameDiv = <StyleDiv >
                        <StyledP >
                            The name of node is
                            <StyleInput onChange={ChangeName} defaultValue={props.state.name} />
                        </StyledP> 
                    </StyleDiv>
    }

    if (props.state.type !== null) {
        NodeTypeDiv =   <>
                        <StyleDiv>
                            <StyledP>
                                The type of node is 
                                <StyleInput onChange={ChangeType} defaultValue={props.state.type} />
                            </StyledP>
                        </StyleDiv>
                        <StyleDiv>
                            <button onClick={createNode}>Save</button>
                        </StyleDiv>
                        </>
    }

    return (
        <div>
            {defaultTextDiv}
            {NodeNameDiv}
            {NodeTypeDiv}
            {NodeCreateDiv}
        </div>
    )


    // if (props.state.name === null && props.state.command === true) {
    //     return (<h2>Please give your node a name</h2>)
    // } else if (props.state.name !== null && props.state.type === null) {
    //     return (
    //         <StyleDiv >
    //             <StyledP >
    //                 The name of node is
    //                 <StyleInput onChange={ChangeName} defaultValue={props.state.name} />
    //             </StyledP> 
    //         </StyleDiv>
    //     )
    // } else if (props.state.name !== null && props.state.type !== null) {
    //     return (
    //         <>
    //             <StyleDiv>
    //                 <StyledP>
    //                     The name of node is 
    //                     <StyleInput  onChange={ChangeName} defaultValue={props.state.name} />
    //                 </StyledP>
    //             </StyleDiv>

    //             <StyleDiv>
    //                 <StyledP>
    //                     The type of node is 
    //                     <StyleInput onChange={ChangeType} defaultValue={props.state.type} />
    //                 </StyledP>
    //             </StyleDiv>
    //         </>
    //     )
    // } else {
    //      return <h1>Hi</h1>
    // }
}


export default StyledNodeCreateWindow
