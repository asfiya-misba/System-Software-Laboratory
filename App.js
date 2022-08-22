import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Grid,
  Button,
  GridItem,
  Flex,
  Modal,
  ModalOverlay,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/react';
import './App.css';
import TaskView from './screens/TaskView';


function App() {

  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [data, setData] = useState([]);
  const [input_title, setTitle] = useState("");
  const [input_des, setDes] = useState("");
  const [input_priority, setPriority] = useState("");
  const [input_status, setStatus] = useState("");
  const [input_deadline, setDeadline] = useState("");


  //POST Method
  const apiPost = async() => {
    fetch("http://127.0.0.1:8000/dashboard/createtask/",{
      method: "POST",
      headers:{
        "Content-type":"application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        assignee_id: '1',
        task_name: input_title,
        task_des: input_des,
        priority: input_priority,
        status: input_status,
        deadline: input_deadline,
      }),
      
    })
    .then((response)=> response.json())
    .then((json) => console.log(json));
  };


    //GET Method
    const apiGet=()=>{
    fetch(`http://127.0.0.1:8000/dashboard/displaytask/`)
    .then((response)=>response.json())
    .then((json)=>{
        console.log(json);
        setData(json);
    }); 
    };


    useEffect(() => {
        apiGet();
        
    }, []);



  return (



    <>
    <div>
    <div>
              <Text id="kanban"> Kanban Board </Text>
              <Text id="user_task"> Asfiya's Tasks </Text>
              <div>
              <Button id="create_button" color='white' onClick={onOpen}>Create</Button>

              <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent >
                <ModalCloseButton id="close_button"/>
                <ModalBody>
                <form onSubmit="handleSubmit" id="create_task_modal">
                        <Text id="create_task"><b>Create a Task</b></Text>
                        <label for="task_name"><b>Task Name:</b></label><br></br>
                        <input type="text" id="task_name" name="task_name" value={input_title} onChange={e=>setTitle(e.target.value)} /><br></br>
                        <label for="description"><b>Task Description:</b></label><br></br>
                        <textarea id="task_des" onChange={e=>setDes(e.target.value)} name="task_des" rows="3" cols="50"></textarea><br></br>
                        
                        <label for="priority" ><b>Priority:</b></label><br></br>
                        <select name="priority" onChange={e=>setPriority(e.target.value)} id="priority">
                        <option value="P1">Immediate - P1</option>
                        <option value="P2">Need Attention - P2</option>
                        <option value="P3">Normal Queue - P3</option>
                        <option value="P4">Low Priority - P4</option>
                        </select><br></br>

                        <label for="status"  ><b>Status:</b></label><br></br>
                        <select name="status" onChange={e=>setStatus(e.target.value)} id="status">
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        </select><br></br>
  
                        <label font="inter" for="deadline"><b>Deadline:</b></label><br></br>
                        <input type="date" id="deadline" onChange={e=>setDeadline(e.target.value)} name="deadline"></input>
                 </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit" id="save_button" onClick={apiPost} color="white" colorScheme='blue' mr={3}>
                      Save
                    </Button>
                    <Button id="cancel_button" onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                  </ModalContent>
              </Modal>
              </div>  
              <Text id="status_1"> Not Started </Text>
              <Text id="status_2"> In Progress </Text>
              <Text id="status_3"> Completed </Text>
          </div>

      <Flex>
        <Box id="box1" p='4'>
          <Grid container spacing={2} id="rect_1"
                h='300px' 
                gap={4}>
                <GridItem>
                  
                {data.filter(subData => subData.status.includes('Not')).map((item) => (
            
            <TaskView
            task_id={item.task_id}
            task_name={item.task_name}
            deadline= {item.deadline}
            status={item.status}
            task_des={item.task_des}
            priority={item.priority}
          />
            
                ))}
              
      
                  </GridItem>  
              </Grid>
        </Box>
      
        <Box id="box2" p='4' bg='green.400'>
          <Grid container spacing={2} id="rect_2"
          h='200px' 
          templateRows='repeat(6, 1fr)'
          templateColumns='repeat(6, 1fr)'
          gap={4}>
         <GridItem >
         
                {data.filter(subData => subData.status.includes('In Progress')).map((item) => (
                            <TaskView
                            task_id={item.task_id}
                            task_name={item.task_name}
                            deadline= {item.deadline}
                            status={item.status}
                            task_des={item.task_des}
                            priority={item.priority}
                          />
                            
                ))}
          </GridItem> 
          </Grid>
          </Box>
        
            <Box p='4' bg='green.400'>
              <Grid container spacing={2} id="rect_3"
              h='200px' 
              templateRows='repeat(6, 1fr)'
              templateColumns='repeat(6, 1fr)'
              gap={4}>
            <GridItem >
            {data.filter(subData => subData.status.includes('Completed')).map((item) => (
            <TaskView
                task_id={item.task_id}
                task_name={item.task_name}
                deadline= {item.deadline}
                status={item.status}
                task_des={item.task_des}
                priority={item.priority}
              />
                
            ))}
            
          
          </GridItem> 
          </Grid>
          </Box>
      
        </Flex>
    </div>
   </>
  );
}

export default App;
