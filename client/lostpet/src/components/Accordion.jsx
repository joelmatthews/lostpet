import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion({ lostPetData }) {
  return (
    <div style={{ width: "66%", margin: "0 auto" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Owner Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" component="h6"><span style={{fontWeight: 'bold', color: 'grey'}}>Name:</span> {`${lostPetData.owner.firstName} ${lostPetData.owner.lastName}` }</Typography>
          <Typography variant="h6" component="h6"><span style={{fontWeight: 'bold', color: 'grey'}}>Email:</span> {`${lostPetData.owner.email}` }</Typography>
          <Typography variant="h6" component="h6"><span style={{fontWeight: 'bold', color: 'grey'}}>Cell #:</span> {`${lostPetData.owner.phoneNumber}` }</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Last Seen Address</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" component="h6">{lostPetData.lastLocationAddress}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" component="h6">{lostPetData.description}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
