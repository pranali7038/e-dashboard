import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            <img alt="logo" 
            className="logo"
             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA/FBMVEUlLzj///8lMDclLzkAAAANGSi5vLvBw8G1trokMDkPGyclMDYJGCaqrLIKHit4fIAYJjAgKjPleR5KTVIADxrZ29wAABOXm58TICrDxMcAFiLLzc6gpKbr7e6ChouLj5IyPEgAAA8RISoVKzkAJTfl5eboeBvRdCgAEB8AABgAJzUAAAh3fYBpcHNZX2MoLzOPVyt9Uy4/S1U4P0UWJi0dJDASGyJqcXpNVVg9Q0YAChLz9/kZMDhCNzCQXzFtTDBXQjK8bCYEJiyZXirfeCavZyouMS7OdihNQDTodyA/
             ODanYShJODMXLS5ZRzVUOy98VDRmSTFdZHAAHRtuag8yAAAMEElEQVR4nO2aC1fayhbH4wxaJhHIIGJAgUIAEVGqgNqjPT21etqenue93/+73L1nJskEEsXTVdvbtX+rq0syj8w/s2fPnofjEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBED8EgsE/QHzrhnxFmMOBb92Kr8pF6PuhZN+6GV8N4RY3gN2a84MaquB1FLhxKR+0VOGXtzez2JaYzPnCXU0rlyUXDgxx6ZazCwcCPysTQUZpLF8usy+2LRF0UOB1AZqZl4c7stsubmXSOJXQSNntZKWXTrscWiivGtm
             Fi3s1/ECit5edDjlqX66w0EKFB8EDebicXW/k0faZI1/npe/Dl3P8SW7pjStfOKK2m5te+GKF81NVEZhLvj2In/IFgkJoYX761kg4fiW/+AbYKXtIobeuEoGzgvC4F3opjzJqYD2NEf59E3JHTNl0uWywB1n2i5lsgZX2DnLS0TxgvlUKrzPS8d3FHndQ4W52/c21+8oDfYKH4zc/+6m+8tWXOsXhEL79u3/DuVjxqU1oSaNw4WYC00xuegGqrvhaYS2jbAE+zaCuFe4dbS4nB4HbW1ug43Hu3fR/eTf80E91D37+jRaOFid8Nbw7C0O2YhfNfRioruAsA/gcDBUeBGwlnXehEzuBttICd1YKL9rw7q5WeNATy8nrq0Ow/
             94eDofDw1vbZ3bVCOoERmF1ePd+2l92qlqhCn1WwKqVQtdjK2lphd5yupdSGKykC7FqTxl9xyAjDMHb25/vhlXgcGz1kX+ijLQuYoXV6vD+Tf8GOizRqRSW80NXpbCXETHUUwpX+8RHhXVmFD4uJhMxdTgT41/fV5W+KlhpopDX91Fg0TUKqzrL8MM//dBqz1oKg4z0Z1EIK4eb/sf7odYHzT8cJ2lyprrwXMUlqg/Vd/gEuc7GYdyJ37nCsP/2AzZ7aLrnbZi0xC2hwN0j/Uv8dl+NMuKAlJHG71ghEzf+2Z3pPnQjn3/vh0my6KounPjmN+//8TN8DdPfw+rnN2P2fArLMgWT6wjk/M+72DyrYHk3N8svwHdHvz2Ph/0/
             7yHrJ93hw/vw2RSW+OxlmjXWrDBDnMUD8P6vsRSp9QMvDFBgYh6CTSHqGU9f3Q1NMT1on0XhKsXy4wrZzRm09NOwenfmjQVGbXayvFIVJS+ewpTFQGN4+887NRxNePCNFJbcRxVyFqLC6v0vt6GzHFkLsb2F9eyPVstx2f/1/d237sOt9RWeheMbvjwhC0cvfU/9lXJqPEKA96wKD2q9wKJc9lcblqsQwpRfYHpLt4CrFcPG9fFquXD8x/soAHo+hWXohBj0F2vEpbFCGIqHZ/PQdjOMH6uQdK83XVIO7vSdmRSfV6H39LDb4zd/J5NF9fPHMcZinirMfb30tUfhFL5i/w+YQJcCoO83LvWmXP59OFSx2Cf8/8PZGFyqbkl
             NhaQNe4Up5Pivz1H3qbDmN/F9K4T1hxf2P77TzVVzePX9m9DTalQX7tiRgzw7TOI7CBBuzVrxKyt0/r1CNsVF2s34V9UxJhYz60O187Ax6FrZVeT9KV5ejMNo+00rzN9PfVhh7xGF3S+NvB10HvMoOv1UPdRrfB2Stm2PbNYWagb92A+X14cic/Cj19MKxUqUpfbxOpueVrhaXqgV8LFnPM0X7KpBMOaPYYWhPIhWaDb4ju3vrhSq4Tcdp5qr92Ga7nYGrozSV9Oaap9mwZTCxWilfLNQwn0abaV79az63fU24iFYA2OFVWJ1GPVhfXc1LtJ9iMMvHb86Pm4a777IpHEq9V5cRvoWzkcLbnYTt1YzYCNKPaEUDrLrH611Zs
             TVZC94H1f6SqE8V104Ta1QwvfD4TscfoJ56Xq7rayoaiM29OP89NImYw/ul85hen9ov3StPkw0hLev3vU5Z5v6NOYoNfrDs/s39vIxRkg5yG3CxOdCTvMkFtGVLfIVXuP+woN73k8SiLth4Rj3/2pR45Y+QJhpEzBnHJ+UsimeSpxRupnpB7Malpc7OYVLlYKyIr+Tl2GN9YUN7rp53HNYdBqzvFlnb7DZXwYCRqmi4VUCiXOmEAvX3bSfu5gWSFWfkK6bVdZ1fdMAPyd982kCMV5jKMOr69OY8pJC0H+TVU6FwTmhoqnhX+zgYiHTgJyyT6vTA2D+xyJC6pB0btoocD/cwBxLNT5wlmJ8jGzM84i4gPCmjt0m5d8AVbO6MDD1bNjUUXvK+KdVp4hO3WEKWPf0XfqKha8G3tx3C8hCPZTQMO5byFQZf2lDSMQJvm8+hkxWcsK3V3X4Na2qYSXg+Ck4Hk3aD3Q5vohfvcZ0CFn8+k5FM5mcSy5PJ+rPiX4G85m4qJgf8LyiQlXZvTKPZt20xuZJnHdWhx4V/knl0own0atMTmTy3SEekydxzbhtX7GZwCfwdyaT5EmAZUf+pWla82KN7mMi+I/lfNtz4TZS7vjFhWju2w86c9zCSU4EW6/t0E4f5Rj2u6AQBjX4LJ1awAsBidU6x9a7rgugMD0VzKTZk47nBjCLo1Lyu9R1HoXJHbuKtr+ssOHyQuqAs7NgvJbKMpWJj90u2ikQb7P6AKJnnchRYbLi9Eb2q0ChnC4rXJoqC9xbdOwHxRH3HrFUtg1vKRrLQit15Cn+edLaaKEBTcBKQWErMia0UnXq1TBPYDJubKcVXlaUVZ+oGxwPKHSgy1rtyAJPwEodLHcJQV7pUlsphjuly/jdPlQHft78xmDwXD52mUlA8wcFPXLn8zkeBauxXYB2FeABDmdUWLA8DcNAkwX6J64P6l5K4cikPKYQP1SlaXs59ER+GT5Nu6k9DSqMsihPI6CKRlf/akLGUvmx/ZpIYQ9YSHRe+pvUBmrtqYqjwi7M6JgHvqJQCmc6olPXbWRiKaiwCbUFgfsSoukHrXQBC5jKqKfrhfCT6wkBj/TaPp6gemph1XbjdxuFTb2xK2CwFLcz1pUpOC5tttodxU49dnTYrrrZYkSF9Y4BDbKHCr2pmpfKIGmRWCn+1Hn3YPSe+I7yUwVfnTX0ati8OK8AK7021U7ceCGkFZq/sQ9PTZ5LH8IRaEyjqWdVVLjVe0yhk/I0g1nk+pcVxr7ltTQKhTqD5egON5PqUGEhru9C4mUYqPfkNVKBAL1jBbs129Mc1PIUbpkcu02IC6Ax+039at9RFxkejWuCU8tVXte8bIWjFYW1OjLqqM2i+C1phdcYNx7Zrrh1bAVFomt73r1gTYUvRurVdW+A09tjs74nuDw6N84Pl9JzvfmyrPBI+TLwtpGVzpMVzWSRVhjl3VWOANxHknX/wg77uPNf90TP6HjMdZSj8AqyYARyaqz0RWJ2rbpY675dFBk18TDAixQOYoUwcxj35S8wskSFQdzsjr2nigq3FwsVVykPhULqOzgqr/c65zX7tR5e7DR5uwc4/ak4c1lh200CRNWHjatY4GydU0Q/Pg8ou9kKYYneKkR5AimUwunBC3Wz7OBl6pCrDCZ1ZHxfF4YZHgowTwbwlQaFnkxFyp4ol3uGbkkpXOnDS3S38bvBwaLCmbkHN+muJbC9FzPQEYtRGFup2kuLM0EIoMZhoK4AgeLUHSnswyhnp6UVwtDGqzMDsKiUQjZLasVgr87VfputEKO2QdLAQPdh09w+8te5bSJqqQ2IVpfrMWUrNHdOIqP0tULdWLwrtqzQQp1iQk6GfVh3vPQBZSpg3Gj3hJguKcR2WBSML41mp6cr3L+I50OIl6OwltfatsLAKeOgya5dn1hFJNP78bWOIPIVtn8y70aFnfjugGvv0RQEBg37zadc5hVyJ2GeOAJ8nBh5UE8yvYSl6mxnRxlfBu4sznk163KrvvPlQSO8qzjvrJusUBi8JMlVd5J3S9Xe1/Jp15Wt+w0p5clPXNhbmZgqlKNQMPvCRNLPIl29qTf1bjuvtcJKvRtX2KsVPQxjnjl1ZI61I5Fqvucpb2LyOGaHNfNDqqt6cX3JuMvucMaid9uVQYPi7PCNplb71Jj+QS+cEwRBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEP/f/A+Jr3Rl7yfP4QAAAABJRU5ErkJggg=="/>
            {auth ? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">logout Product({JSON.parse(auth).name})</Link></li>
                {/* <li>{auth ? <Link onClick={logout} to="/signup">logout Product</Link> :
                    <Link to="/signup">Sign Up</Link>}</li>
                <li><Link to="/login">Login</Link></li>     */}
            </ul>
                : <ul className="nav-ul nav-right">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;