import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, MenuItem, Select,
  FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle, Box, Checkbox,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

function UserTable() {
  const cities = ["Душанбе", "Худчанд", "Вахдат", "Кулоб"];
  const statuses = ["Активен", "Неактивен"];

  // Состояния
  const [users, setUsers] = useState([
    { id: 1, avatar: 'https://masterpiecer-images.s3.yandex.net/384435935fc311eea1697a2f0d1382ba:upscaled', name: "Усмон", city: "Душанбе", status: "Активен" },
    { id: 2, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKttGRFuFPcOJgtePukcpo3rmmRUlcxn3_rg&s', name: "Ануш", city: "Худчанд", status: "Неактивен" },
    { id: 3, avatar: 'https://e7.pngegg.com/pngimages/904/660/png-clipart-anime-manga-black-and-white-desktop-manga-boy-black-hair-monochrome.png', name: "Мухаммад али", city: "Кулоб", status: "Неактивен" },
    { id: 4, avatar: 'https://masterpiecer-images.s3.yandex.net/384435935fc311eea1697a2f0d1382ba:upscaled', name: "Усмон", city: "Душанбе", status: "Активен" },
    { id: 5, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKttGRFuFPcOJgtePukcpo3rmmRUlcxn3_rg&s', name: "Ануш", city: "Худчанд", status: "Неактивен" },
    { id: 6, avatar: 'https://e7.pngegg.com/pngimages/904/660/png-clipart-anime-manga-black-and-white-desktop-manga-boy-black-hair-monochrome.png', name: "Мухаммад али", city: "Кулоб", status: "Неактивен" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [newUser, setNewUser] = useState({ avatar: '', name: '', city: '', status: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Open add New User
  const openAddUserDialog = () => {
    setNewUser({ name: '', city: '', status: '' });
    setOpenAddDialog(true);
  };

  // Close add modal
  const closeAddUserDialog = () => setOpenAddDialog(false);

  // Open add modal
  const startEditing = (user) => {
    setEditingUser(user);
    setOpenDialog(true);
  };

  // Close Edit Modal
  const closeEditUserDialog = () => setOpenDialog(false);

  // Save user
  const saveNewUser = () => {
    const newUserWithId = { ...newUser, id: Date.now() };
    setUsers([...users, newUserWithId]);
    closeAddUserDialog();
  };

  // Edit user
  const saveEditedUser = () => {
    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
    closeEditUserDialog();
  };

  // edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  function deleteFunc(id) {
    setUsers((propus) => propus.filter((elem) => elem.id !== id))
  }

  //  search users
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus ? user.status === filterStatus : true) &&
    (filterCity ? user.city === filterCity : true)
  );

  return (
    <Box sx={{ maxWidth: '100%', overflow: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
        <TextField
          label="Поиск..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ width: '40%', color: 'white', border: '1px solid white' }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={openAddUserDialog}
          sx={{ marginLeft: 2 }}
        >
          Добавить пользователя
        </Button>
      </Box>

      {/* Fillter city */}
      <Box sx={{ display: 'flex', marginLeft: '365px' }}>
        <FormControl sx={{ marginLeft: 2, width: '10%', }}>
          <InputLabel sx={{ color: 'white' }}>Город</InputLabel>
          <Select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            label="Город"
          >
            <MenuItem value="">Все</MenuItem>
            {cities.map(city => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Filter Status */}
        <FormControl sx={{ marginLeft: 2, width: '10%' }}>
          <InputLabel sx={{ color: 'white' }}>Статус</InputLabel>
          <Select

            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Статус"
          >
            <MenuItem value="">Все</MenuItem>
            {statuses.map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer>
        <Table sx={{ width: '70%', margin: 'auto' }}>
          <TableHead>
            <TableRow >
              <TableCell sx={{ color: 'white' }}>Имя</TableCell>
              <TableCell sx={{ color: 'white' }}>Город</TableCell>
              <TableCell sx={{ color: 'white' }}>Статус</TableCell>
              <TableCell sx={{ color: 'white' }}>Меню</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: "10px", alignItems: 'center' }}>
                    <img style={{ width: '50px', borderRadius: '50%' }} src={user.avatar} alt="" />
                    <p style={{ color: 'white' }}>{user.name}</p>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'white' }}>{user.city}</TableCell>
                <TableCell>
                  <Checkbox sx={{ color: 'white' }} checked={user.status === "Активен"} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => startEditing(user)}
                  >
                    Редактировать
                  </Button>
                  <IconButton onClick={() => deleteFunc(user.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit user modal */}
      <Dialog open={openDialog} onClose={closeEditUserDialog}>
        <DialogTitle>Редактировать пользователя</DialogTitle>
        <DialogContent>
          <TextField
            label="Фото профила"
            variant="outlined"
            name="avatar"
            value={editingUser?.avatar || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Имя"
            variant="outlined"
            name="name"
            value={editingUser?.name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Город</InputLabel>
            <Select
              name="city"
              value={editingUser?.city || ''}
              onChange={handleChange}
              label="Город"
            >
              {cities.map(city => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Статус</InputLabel>
            <Select
              name="status"
              value={editingUser?.status || ''}
              onChange={handleChange}
              label="Статус"
            >
              {statuses.map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditUserDialog} color="primary">Отменить</Button>
          <Button onClick={saveEditedUser} color="primary">Сохранить</Button>
        </DialogActions>
      </Dialog>

      {/* Add-New-User modal */}
      <Dialog open={openAddDialog} onClose={closeAddUserDialog}>
        <DialogTitle>Добавить нового пользователя</DialogTitle>
        <DialogContent>
          <TextField
            label="Фото профила"
            variant="outlined"
            name="avatar"
            value={newUser.avatar}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Имя"
            variant="outlined"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Город</InputLabel>
            <Select
              name="city"
              value={newUser.city}
              onChange={handleChange}
              label="Город"
            >
              {cities.map(city => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Статус</InputLabel>
            <Select
              name="status"
              value={newUser.status}
              onChange={handleChange}
              label="Статус"
            >
              {statuses.map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddUserDialog} color="primary">Отменить</Button>
          <Button onClick={saveNewUser} color="primary">Добавить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserTable;
