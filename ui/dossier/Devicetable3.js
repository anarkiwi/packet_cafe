import React from "react";
import { Header, Table } from "semantic-ui-react";
import {
  faUserLock,
  faDesktop,
  faTerminal,
  faUsersCog,
  faServer,
  faMountain,
  faEnvelopeOpenText,
  faFolderOpen,
  faCodeBranch,
  faLaptopCode,
  faKey,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  "Admin. Workstation": faUserLock,
  "Business Workstation": faDesktop,
  "Developer Workstation": faTerminal,
  "AD Controller": faUsersCog,
  "Admin. Server": faServer,
  "Confluence Server": faMountain,
  "Exchange Server": faEnvelopeOpenText,
  "File Share": faFolderOpen,
  "Git Server": faCodeBranch,
  "GPU Laptop": faLaptopCode,
  "Printer": faPrint,
  "PKI Server": faKey,
  "Unknown Device": faQuestionCircle
};

const tableData = [
  {
    device: "Inventec",
    OS: "Linux",
    IP: "10.0.2.15",
    MAC: "40:61:86:9a:f1:f5",
    networkMLlabel1: { label: "Admin. Server", confidence: 0.75 },
    networkMLlabel2: { label: "Confluence Server", confidence: 0.2 },
    networkMLlabel3: { label: "PKI Server", confidence: 0.05 }
  },
  {
    device: "Super Micro",
    OS: "Windows 7",
    IP: "67.215.65.132",
    MAC: "08:00:27:cc:3f:1b",
    networkMLlabel1: { label: "Admin. Server", confidence: 0.75 },
    networkMLlabel2: { label: "PKI Server", confidence: 0.2 },
    networkMLlabel3: { label: "Printer", confidence: 0.05 }
  },
  {
    device: "Super Micro 2",
    OS: "Windows 7",
    IP: "172.16.255.1",
    MAC: "00:1e:68:51:4f:a9",
    networkMLlabel1: { label: "Admin. Server", confidence: 0.6 },
    networkMLlabel2: { label: "Exchange Server", confidence: 0.2 },
    networkMLlabel3: { label: "Confluence Server", confidence: 0.2 }
  },
  {
    device: "Cisco",
    OS: "NX-OS",
    IP: "172.16.255.2",
    MAC: "00:d9:d1:10:21:f9",
    networkMLlabel1: { label: "Admin. Server", confidence: 0.6 },
    networkMLlabel2: { label: "AD Controller", confidence: 0.2 },
    networkMLlabel3: { label: "Git Server", confidence: 0.2 }
  }
];

function deviceReducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending"
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending"
      };
    default:
      throw new Error();
  }
}

function Devicetable3() {
  const [state, dispatch] = React.useReducer(deviceReducer, {
    column: null,
    data: tableData,
    direction: null
  });
  const { column, data, direction } = state;

  return (
    <Table sortable celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === "device" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "device" })}
          >
            Device
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "OS" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "OS" })}
          >
            OS
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "IP" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "IP" })}
          >
            IP
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "MAC" ? direction : null}
            onClick={() => dispatch({ type: "CHANGE_SORT", column: "MAC" })}
          >
            MAC
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "networkMLlabel1" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "networkMLlabel1" })
            }
          >
            Primary Label
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "networkMLlabel2" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "networkMLlabel2" })
            }
          >
            Secondary Label
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === "networkMLlabel3" ? direction : null}
            onClick={() =>
              dispatch({ type: "CHANGE_SORT", column: "networkMLlabel3" })
            }
          >
            Tertiary Label
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(
          ({
            OS,
            IP,
            device,
            MAC,
            networkMLlabel1,
            networkMLlabel2,
            networkMLlabel3
          }) => (
            <Table.Row key={device}>
              <Table.Cell>
                <Header>{device}</Header>
              </Table.Cell>
              <Table.Cell>{OS}</Table.Cell>
              <Table.Cell>{IP}</Table.Cell>
              <Table.Cell>{MAC}</Table.Cell>
              <Table.Cell>{networkMLlabel1}</Table.Cell>
              <Table.Cell>{networkMLlabel2}</Table.Cell>
              <Table.Cell>{networkMLlabel3}</Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
}

export default Devicetable3;