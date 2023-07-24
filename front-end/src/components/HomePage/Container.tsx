

import axios from 'axios';
import { useEffect, useState } from 'react';

import { VscAccount as AccountIcon } from 'react-icons/vsc'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';


import { address, host, port } from '../../Const';
import { authContext } from '../context/useContext';
import { makeGetRequest } from '../../Helpers';




