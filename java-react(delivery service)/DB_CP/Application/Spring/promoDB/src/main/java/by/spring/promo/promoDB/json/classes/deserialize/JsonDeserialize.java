package by.spring.promo.promoDB.json.classes.deserialize;

import by.spring.promo.promoDB.json.classes.ListRoads;
import by.spring.promo.promoDB.json.classes.Node;
import by.spring.promo.promoDB.json.classes.Road;
import by.spring.promo.promoDB.repository.AdminRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class JsonDeserialize {
    public final JdbcTemplate jdbcTemplate;


    public final AdminRepository userLoginRepository;

    @Autowired
    public JsonDeserialize(JdbcTemplate jdbcTemplate, AdminRepository adminRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.userLoginRepository = adminRepository;
    }

    public void deserializeJson() throws FileNotFoundException, SQLException {
        File json = new File("./src/main/resources/jsons/allJson.json");
        JsonElement fileElement = JsonParser.parseReader(new FileReader(json));
        JsonArray jsonArrayOfRoads = fileElement.getAsJsonArray();

        ListRoads listRoads = new ListRoads(new ArrayList<>());
        int counter= 0;
        for(JsonElement road : jsonArrayOfRoads){
            JsonObject roadObject = road.getAsJsonObject();
            String roadName = roadObject.get("roadName").getAsString();

            listRoads.getRoads().add(new Road(roadName, new ArrayList<>()));

            JsonArray nodes = roadObject.get("nodesCoordinates").getAsJsonArray();
            for(JsonElement node : nodes){
                JsonObject nodeObject = node.getAsJsonObject();
                double latitude = nodeObject.get("lat").getAsDouble();
                double longitude = nodeObject.get("lon").getAsDouble();
                listRoads.getRoads().get(listRoads.getRoads().size()-1).
                        getNodesCooordinates().add(new Node(latitude, longitude));
            }
            System.out.println(++counter+" "+listRoads.getRoads().
                    get(listRoads.getRoads().size()-1).getRoadName()+" deserialized");
        }
        System.out.println("deserializing ended");
        //deserializing ended



        DriverManager.registerDriver(new oracle.jdbc.OracleDriver());
        Connection getConnection = DriverManager.getConnection("jdbc:oracle:thin:@//localhost:1521/COURSE_PDB",
                "admin", "qwerty");

        counter = 0;
        for (Road road: listRoads.getRoads()) {
            if(counter >= 0){
                String coordinatesString = "";
                for (Node node: road.getNodesCooordinates()) {
                    coordinatesString += node.getLatitude()+","+node.getLongitude()+",";
                }
                coordinatesString = coordinatesString.substring(0, coordinatesString.length()-1);
                Statement statement = getConnection.createStatement();
                statement.execute("INSERT INTO ROADS (ROAD_NAME, ROAD) VALUES ('"+road.getRoadName()+"', SDO_GEOMETRY(2002, 4326, NULL, SDO_ELEM_INFO_ARRAY(1,2,1), SDO_ORDINATE_ARRAY("+coordinatesString+")))");
                statement.close();

                Statement statementCommit = getConnection.createStatement();
                statementCommit.execute("commit");
                statementCommit.close();
                System.out.println(counter+" inserted "+road.getRoadName());
            }
            ++counter;
        }
    }
}
