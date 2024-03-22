import House from "../Models/landLVM/houseVModel.js";
import Notice from "../Models/landLVM/noticeVModel.js";
import ProdForestIsAnArtificialForest from "../Models/landLVM/prodForestIsAnArtificialForestVModel.js";
import PerennialTree from "../Models/landLVM/perennialTreesVModel.js";
import OtherConstructionWork from "../Models/landLVM/otherConstructionWorkVModel.js";
import LandLicence from "../Models/landLicenceModel.js";
import { updateExistingObject } from "../Utils/certificateRepository.js";

const createdCertificate = async (userId, data) => {
  try {
    data.status = "draft";
    if (!userId) return Error("userId is required");

    const houseData = { ...data.house_id };
    const noticeData = { ...data.notice };
    const otherConstructionWorkData = { ...data.otherConstructionWork };
    const prodForestIsAnArtificialForestData = {
      ...data.otherConstructionWork,
    };
    const perennialTreesData = { ...data.perennialTrees };

    const existingCertificate = await LandLicence.findOne({ userId: userId });

    if (existingCertificate) {
      // Update existing LandLicence object
      (existingCertificate.land_lot = data.land_lot),
        (existingCertificate.diagram_url = data.diagram_url),
        (existingCertificate.idBlockchain = data.idBlockchain),
        (existingCertificate.ipfsHash = data.ipfsHash),
        (existingCertificate.transactionHash = data.transactionHash);

      if (existingCertificate.house_id) {
        const existingHouse = await updateExistingObject(
          House,
          existingCertificate.house_id,
          houseData
        );
        if (existingHouse) {
          return existingHouse;
        }
      }
      if (existingCertificate.other_construction_works) {
        const existingOtherConstructionWork = await updateExistingObject(
          OtherConstructionWork,
          existingCertificate.other_construction_works,
          otherConstructionWorkData
        );
        if (existingOtherConstructionWork) {
          return existingOtherConstructionWork;
        }
      }
      if (existingCertificate.prod_forest_is_an_artificial_forest) {
        const existingProdForestIsAnArtificialForest =
          await updateExistingObject(
            ProdForestIsAnArtificialForest,
            existingCertificate.prod_forest_is_an_artificial_forest,
            prodForestIsAnArtificialForestData
          );
        if (existingProdForestIsAnArtificialForest) {
          return existingProdForestIsAnArtificialForest;
        }
      }
      if (existingCertificate.perennial_trees) {
        const existingPerennialTrees = await updateExistingObject(
          PerennialTree,
          existingCertificate.perennial_trees,
          perennialTreesData
        );
        if (existingPerennialTrees) {
          return existingPerennialTrees;
        }
      }
      if (existingCertificate.notice) {
        const existingNotice = await updateExistingObject(
          Notice,
          existingCertificate.notice,
          noticeData
        );
        if (existingNotice) {
          return existingNotice;
        }
      }

      const updateCertificateData = existingCertificate.save();
      return updateCertificateData;
    } else {
      // Create new LandLicence object
      const house = new House(houseData);
      const notice = new Notice(noticeData);
      const otherConstructionWork = new OtherConstructionWork(
        otherConstructionWorkData
      );
      const prodForestIsAnArtificialForest = new ProdForestIsAnArtificialForest(
        prodForestIsAnArtificialForestData
      );
      const perennialTrees = new PerennialTree(perennialTreesData);

      await Promise.all([
        house.save(),
        notice.save(),
        otherConstructionWork.save(),
        prodForestIsAnArtificialForest.save(),
        perennialTrees.save(),
      ]);

      const certificateData = {
        userId: userId,
        status: data.status,
        land_lot: data.land_lot,
        diagram_url: data.diagram_url,
        idBlockchain: data.idBlockchain || null,
        ipfsHash: data.ipfsHash || null,
        transactionHash: data.transactionHash || null,
        house_id: house._id || null,
        other_construction_works: otherConstructionWork._id || null,
        prod_forest_is_an_artificial_forest:
          prodForestIsAnArtificialForest._id || null,
        perennial_trees: perennialTrees._id || null,
        notice: notice._id || null,
      };

      const newCertificate = new LandLicence(certificateData);
      const createdCertificate = await newCertificate.save();
      return createdCertificate;
    }
  } catch (error) {
    console.error("Failed create data:", error.message);
    throw new Error("Failed create data");
  }
};

const createCertificateIPFSJon = async (certificateData) => {
  try {
    const jsonCertificateData = {
      userId: certificateData.userId,
      status: certificateData.status,
      land_lot: certificateData.land_lot,
      diagram_url: certificateData.diagram_url,
      idBlockchain: certificateData.idBlockchain,
      ipfsHash: certificateData.ipfsHash,
      transactionHash: certificateData.transactionHash,
      house_id: certificateData.house_id,
      other_construction_works: certificateData.other_construction_works,
      prod_forest_is_an_artificial_forest:
        certificateData.prod_forest_is_an_artificial_forest,
      perennial_trees: certificateData.perennial_trees,
      notice: certificateData.notice,
    };
    const jsonCertificate = JSON.stringify(jsonCertificateData);
    // console.log(jsonCertificate)
    return jsonCertificate;
  } catch (error) {
    console.error("Failed to create JSON data:", error.message);
    throw new Error("Failed to create JSON data");
  }
};
export { createdCertificate, createCertificateIPFSJon };
