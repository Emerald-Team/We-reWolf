import { useState } from "react"

const PlayerList = ({count}) => {

  return (
<>
<div style= {{display: "flex", flexDirection: "column"}}>

<h1><b>Player List</b> <span>1/{count}</span></h1>
<div>BadBill</div>
<div>ZachAttack</div>
<div>Chordata</div>
<div>PopeShaq</div>
<div>theRealJae</div>
</div>
</>

  )
}

export default PlayerList
