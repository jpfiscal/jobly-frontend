import axios from "axios";
import {jwtDecode} from "jwt-decode";


const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of all companies */
  static async getAllCompanies(){
    let res = await this.request(`companies/`);
    //console.log(`getallcompanies = ${res.companies}`);
    return res;
  }

  /**Get a filtered list of companies based on name */
  static async findCompaniesByName(name){
    if (name){
      let res = await this.request(`companies?name=${name}`);
      return res;
    } else {
      return await this.getAllCompanies();
    }
  }
  
  static async findUserByName(username){
    let res = await this.request(`users/${username}`);
    return res;
  }

  /** Get a list of all jobs */
  static async getAllJobs(){
    let res = await this.request(`jobs/`);
    return res;
  }

  /**login to authenticate user and retrieve token */
  static async getToken(username, password){
    const data = { username, password };
    let res = await this.request('auth/token/', data, "post");
    console.log(`RES: ${JSON.stringify(res)}`)
    JoblyApi.token = res.token;
    return res.token;
  }
  /**Decode token and return currentUser Object */
  static async decodeToken(token){
    const decoded = jwtDecode(token);
    console.log(`PAYLOAD: ${JSON.stringify(decoded)}`);
    return decoded;
  }
  /**register a new user */
  static async registerUser(username, password, firstName, lastName, email){
    const data = {username, password, firstName, lastName, email};
    let res = await this.request('auth/register', data, "post");
    return res.token;
  }
  /**Update an existing user */
  static async updateUser(username, firstName, lastName, password, email){
    const data = {firstName, lastName, password, email};
    try{
      let res = await this.request(`users/${username}`, data, "patch");
      return res;
    }catch(err){
      console.error("unable to update user:", err);
    }
  }
  /**Create applications record by allowing user to apply for a job */
  static async apply(username, jobId){
    let res = await this.request(`users/${username}/jobs/${jobId}`,{},"post");
    return res;
  }
  /**Check to see if a given user applied to a given job */
  static async checkApplied(username, jobId){
    let res = await this.request(`users/${username}/jobs/${jobId}`,{},"get");
    return res;
  }
  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;