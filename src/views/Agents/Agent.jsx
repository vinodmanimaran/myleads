import React from 'react'
import './Agent.css'
import Agenttable from 'component/AgentTable/Agenttable'
import CreateAgent from 'component/CreateAgent/CreateAgent'

const Agent = () => {
  return (
    <div>
        <div className="agent-create-btn">
        <CreateAgent />

        </div>

        <Agenttable/>


    </div>
  )
}

export default Agent