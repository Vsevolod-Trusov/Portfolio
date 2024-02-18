using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models.User
{
    public class ImgText
    {
        public ImgText()
        {
            Text = "";
            Text = "";
        }
        public ImgText(string Text =null, string ImgPath = null)
        {
            if (Text != null)
            {
                this.Text = Text;
            }
            if (ImgPath != null)
            {
                this.ImgPath = ImgPath;
            }
        }
        public string Text { get; set; }
        public string ImgPath { get; set; }
    }
}
