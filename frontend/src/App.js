import { Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Box, Alert, InputLabel, MenuItem, 
Select, FormControl, FormLabel, RadioGroup, Radio, FormGroup, Stack, Table, TableBody, TableCell, TableContainer,
TableHead, TableRow, Paper, Avatar
} from '@mui/material';
// import { LocalizationProvider } from '@mui/lab';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DatePicker from "react-datepicker";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useGetResumeProfileQuery, useSaveProfileMutation } from './services/candidateProfileApi';


function App() {

  // Style for Upload Button
  const Input = styled("Input")({
    display: "none",
  });

  // States
  const [name, setName] =useState()
  const [email, setEmail] =useState()
  const [dob, setDob] =useState(null)
  const [st, setSt] =useState('')
  const [gender, setGender] =useState()
  const [pjl, setPjl] =useState([])
  const [pimage, setPimage] =useState('')
  const [rdoc, setRdoc] =useState('')
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  })

  const [candidates, setCandidate] = useState([])

  // Multi CheckBob
  const getPjl = (e) => {
    let data = pjl;
    data.push(e.target.value);
    setPjl(data);
  }

  // RTK Query 
  const [ saveProfile ] = useSaveProfileMutation()
  const { data, isSuccess } = useGetResumeProfileQuery()
  console.log(data);

  useEffect(() => {
    if(data && isSuccess){
      setCandidate(data.candidate)
    }
  }, [data, isSuccess])
  


  //Handle Form Submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('name', name)
    data.append('email', email)
    data.append('st', st)
    data.append('gender', gender)
    data.append('pjl', pjl)
    data.append('pimage', pimage)
    data.append('rdoc', rdoc)
    console.log(data);
    if(name && email){
      // console.log(data)
      // console.log(data.get('name'))
      // console.log(data.get('email'))
      // console.log(data.get('st'))
      // console.log(data.get('gender'))
      // console.log(data.get('pjl'))
      // console.log(data.get('pimage'))
      // console.log(data.get('rdoc'))

      // Calling savProfile Function Below
      // console.log('onesd',1)
      const res = await saveProfile(data)
      console.log('resdsdf',res);
      if(res.data.status === 'success'){
        setError({status: true, msg: res.data.message, type: res.data.status})
        document.getElementById('resume-form').reset();
      }
      if(res.data.status === 'failed'){
        setError({status: true, msg: res.data.message, type: "error"})
      }
      
    }else{
      setError({status: true, msg: "All Fields Are Required", type: "error"})
    }
  }

  


  // Clear Form
  const resetForm = () => {
    setName('')
    setEmail('')
    setSt('')
    setGender('')
    setPjl([])
    setPimage('')
    setRdoc('')
  }

  return (
    <>
    <Box display="flex" justifyContent="center" sx={{ backgroundColor:'error.light', padding:2 }}>
      <Typography variant="h2" component="div" sx={{ fontWeight: "bold", color: "white" }}>Resume Uploader</Typography>
    </Box>
    <Grid container justifyContent="center">
      <Grid item xs={5}>
        <Box component="form" noValidate id="resume-form" sx={{padding:3}} onSubmit={handleSubmit} >
          <TextField id="name" name="name" required fullWidth margin="normal" label="Name" onChange={(e) => {setName(e.target.value)}}/>
          <TextField id="email" name="email" required fullWidth margin="normal" label="Email" onChange={(e) => {setEmail(e.target.value)}}/>
          <Box mt={2}>
            {/* <LocalizationProvider dateAdaptor = {AdapterDateFns}> */}
          {/* <DatePicker label="Date Of Birth" value={dob} onChange={(newValue) => {setDob(newValue)}} renderInput={(params) => <TextField {...params}/> } /> */}
              
            {/* </LocalizationProvider> */}
          </Box>
          <FormControl fullWidth margin="normal">
            <InputLabel id="state-select-label">State</InputLabel>
            <Select labelId='state-select-label' id="state-select" value={st} label="st" onChange={(e) => {setSt(e.target.value)}}>
              <MenuItem value="up">Uttar Pradesh</MenuItem>
              <MenuItem value="br">Bihar</MenuItem>
              <MenuItem value="mp">Madhya Pradesh</MenuItem>
              <MenuItem value="jh">Jharkhand</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <FormLabel id="gender-radio">Gender</FormLabel>
            <RadioGroup row name="gender">
              <FormControlLabel value="male" control={<Radio />} label="Male" onChange={(e) => {setGender(e.target.value)}}/>
              <FormControlLabel value="female" control={<Radio />} label="Female" onChange={(e) => {setGender(e.target.value)}}/>
              <FormControlLabel value="other" control={<Radio />} label="Other" onChange={(e) => {setGender(e.target.value)}}/> 
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Preferred Job Location</FormLabel>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="Delhi" value="Delhi" onChange= {(e) => getPjl(e)}/>
              <FormControlLabel control={<Checkbox />} label="Noida" value="Noida" onChange= {(e) => getPjl(e)}/>
              <FormControlLabel control={<Checkbox />} label="Gurgaon" value="Gurgaon" onChange= {(e) => getPjl(e)}/>
              <FormControlLabel control={<Checkbox />} label="Pune" value="Pune" onChange= {(e) => getPjl(e)}/>
              <FormControlLabel control={<Checkbox />} label="Mumbai" value="Mumbai" onChange= {(e) => getPjl(e)}/>
            </FormGroup>
          </FormControl>
          <Stack direction="row" alignItems="center" spacing={4} >
            <label htmlFor="profile-photo">
              <Input accept="image/*" id="profile-photo" type="file" onChange = {(e) => {setPimage(e.target.files[0])}}/>
              <Button variant="contained" component="span">Upload Photo</Button>
            </label>
            <label htmlFor="resume-file">
              <Input accept="doc/*" id="resume-file" type="file" onChange = {(e) => {setRdoc(e.target.files[0])}}/>
              <Button variant="contained" component="span">Upload File</Button>
            </label>
          </Stack>
          <Button type="submit" variant="contained" sx={{ mt:3, mb:2, px:5 }} color="error">Submit</Button>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : '' }
        </Box>
      </Grid>
      <Grid item xs={7}>
      <Box display="flex" justifyContent="center" sx={{ backgroundColor:'info.light', padding:1 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: "white" }}>List Of Candidate</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{mindWidth: 650}} aria-label="simpletable">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">State</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Avatar</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {candidates.map((candidates, i) => {
              return (
            <TableRow sx={{ '&:last-chid td, &:last-chidth' : { border:0 }}}>
              <TableCell align="center">{candidates.name}</TableCell>
              <TableCell align="center">{candidates.email}</TableCell>
              <TableCell align="center">{candidates.state}</TableCell>
              <TableCell align="center">{candidates.gender}</TableCell>
              <TableCell align="center">{candidates.location}</TableCell>
              <TableCell align="center"><Avatar src={`http://127.0.0.1:8000/${candidates.pimage}`} /></TableCell>
            </TableRow>
              );
            })
          }
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    </Grid>
    </>
  );
}

export default App;
