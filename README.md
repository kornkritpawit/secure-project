# Everything You Need Backend Service

The application where we can shop for the product. The features that are included in our web application are a shopping page that shows all of our product descriptions, users can add products that they want to buy. We secure the web application by using functionality from the OWASP security specifications.

## Prerequisite
- Node.js
- MongoDB (in case to use the database on your local machine)
## Installation

1. Clone or download this repository to your local machine.
```
git clone https://github.com/kornkritpawit/secure-project
```
2. Add `MONGODB_URI` and `SECRET` variables into [.env](.env) file. The variables should look like this.
```
MONGODB_URI = YOUR_MONGODB_URI
SECRET = YOUR_SECRET_KEY

PORT=9000
API_VERSION=1
TOKEN_EXP_DAYS=1
PAGE_LIMIT=15
```
3. Install dependencies
```
npm install
```
4. Run Application
```
npm start
```
5. If you want to run the web service application. You can follow [frontend_client](https://github.com/KasidisGit/frontend_client) repoitory instruction.
## Members
| Student ID | Name |
|-|-|
| 6110545414 | Kritpawit Soongswang |
| 6110545457 | Jirawadee Sampusri |
| 6110545635 | Vichyawat Nakarugsa |
| 6110546003 | Tiranan Emson |
| 6110546062 | Sukrita Kittipitayakorn |
| 6110546364 | Kasidis Luangwutiwong |

Department of Computer Engineering<br>
Kasetsart University
